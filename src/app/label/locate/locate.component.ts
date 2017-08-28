import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { fabric } from 'fabric';
import { min, max, each, get, map } from 'lodash';
import { ProjectService } from '../../project/project.service';
import { LocateSettingService } from './setting/setting.service';
import { DataBus } from '../../project/data/';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NoClassDialogComponent } from '../bound/dialog/noclass.component';

@Component({
  selector: '[label-locate]',
  templateUrl: './locate.component.html',
  styleUrls: ['./locate.component.css']
})
export class LocateComponent implements OnInit {
    @Input() type: string;
    @Input() source: any;
    @Input()
    set data(d: any){
      this.__data = d;
      if ( this.skipEvent ){
        this.skipEvent = false;
      } else {
        this.populateStage();
      }
    }
    __data: any

    @Input()
    set path(p: any){
        let that = this;
        this._path = p;
        // console.log(p)
        let image = new Image();
        image.onload = function(){
            let img: any = <any>this;
            that.setSize(img.height, img.width)
            that.init()
        };
        image.src = p.path + '/' + p.name;
    }

    private _path: string;
    @ViewChild('canvas') canvas: ElementRef;

    constructor(private el: ElementRef,
                private _project: ProjectService,
                private _locate: LocateSettingService,
                private _data: DataBus,
                private _dialog: MdDialog) { }
    dataHeight: number;
    dataWidth: number;
    scale: number = 1;
    paddingTop: number = 0;
    paddingLeft: number = 0;
    stage: any;
    ready: boolean = false;
    blockEvent: boolean = false;
    skipEvent: boolean = false;
    userInput: any = '';

    ngOnInit() {}

    populateStage(){
        if(this.stage){
          this.blockEvent = true;
          this.stage.clear()
          each(get(this.__data, 'config.loc'), (v: any)=>{
              this.addRect( v.x,
                            v.y,
                            +this._locate.width,
                            +this._locate.height,
                            v.theta || 0,
                            v.class);
          });
          this.blockEvent = false;
        }
    }

    init(){
        let dimension = this.el.nativeElement.getBoundingClientRect()
        if ( dimension.width == 0 ) {
            return;
        }

        let scaleW = dimension.height / this.dataHeight;
        let scaleH = dimension.width / this.dataWidth;
        this.scale = min([scaleW, scaleH]);

        this.paddingTop = ( dimension.height - this.dataHeight * this.scale ) / 2 ;
        this.paddingLeft = ( dimension.width - this.dataWidth * this.scale ) / 2 ;

        if ( this.ready ) {
            this.stage.setDimensions({ width: this.dataWidth, height: this.dataHeight});
            this.populateStage();
        } else {
            this.ready = true;
            setTimeout(()=>{

                this.stage = new fabric.Canvas(this.canvas.nativeElement);
                // console.log(this.stage)
                this.stage.on("object:added", (e: any)=>{
                    this._collectObject();
                });
                this.stage.on("object:scaling", (e: any)=> {
                    e.target.setWidth(e.target.width * e.target.scaleX);
                    e.target.setScaleX(1);
                    e.target.setHeight(e.target.height * e.target.scaleY);
                    e.target.setScaleY(1);
                });

                this.stage.on("object:modified", (e: any)=>{
                    this._collectObject();
                });

                this.stage.on("object:rotating", (e: any)=>{
                    var targetObj = e.target;
                    var angle = targetObj.angle;

                    if ( angle > 270 ){
                        targetObj.angle = 0;
                    } else if ( angle > 90){
                        targetObj.angle = 90;
                    }
                });


                this.populateStage()
            });
        }
    }

    private _collectObject(){
        if(this.blockEvent){
            return;
        }

        let obj = this.stage.getObjects().map((o: any)=>{
            return {
                class: o.class,
                x: o.left + this._locate.width / 2,
                y: o.top + this._locate.height / 2,
                theta: o.angle || 0
            };
        });

        if (obj.length == 0){
            obj = undefined
        }

        this.skipEvent = true;
        this._project.labels(this._locate.projectID, [this.source.data.id], {loc: obj})
            .subscribe(()=>{
                this._data.findLabel(this._data.selected, (v)=>{
                    this._data.updateLabelConfig(v, {loc: obj });
                });
            });
    }

    setSize(height: number, width: number){
      this.dataWidth = width;
      this.dataHeight = height;
      this.canvas.nativeElement.setAttribute('height', height);
      this.canvas.nativeElement.setAttribute('width', width);
    }

    addNewRect(x: number, y: number){
        let width, height;
        width = +this._locate.width;
        height = +this._locate.height;

        if(this._locate.getClass() == undefined){
            this._dialog.open(NoClassDialogComponent);
            return;
        }

        this.addRect(x, y, width, height)
    }

    addRect(x: number, y: number, width = -1, height = -1, theta = 0, cls: string = undefined){
        if (width <= 0 || height <= 0) {
            width = this._locate.width;
            height = this._locate.height;
        }

        console.log(x, width, x - width / 2)
        this.stage.add(new fabric.Rect({
            left: x - width / 2,
            top: y - height / 2,
            width: width,
            height: height,
            stroke: this._locate.getClass(cls).color,
            class: this._locate.getClass(cls).class,
            strokeWidth: max([1, 2 / this.scale]),
            angle: theta,
            fill: 'rgba(0,0,0,0)',
            cornerColor: this._locate.getClass(cls).color,
            cornerSize: 18 / this.scale,
            rotatingPointOffset: 40 / this.scale,
            transparentCorners: false
        }));
    }

    selectedObject(): Array<any>{
        let object: Array<any> = []
        if (this.stage.getActiveObject()){
          object = [this.stage.getActiveObject()];
        }

        if ( this.stage.getActiveGroup() ){
          object = object.concat(this.stage.getActiveGroup().getObjects())
        }

        return object
    }

    delete(){
        let object = this.selectedObject()
        each(object, (v)=>{
          v.remove();
        });
        this.stage.renderAll();
        this._collectObject();
    }

    assignLabel($event){
        if ( $event.key == 'Backpace' || $event.key == "Delete"){
            return
        }

        if(this.isKey($event.which) && !$event.ctrlKey && !$event.metaKey){
          this.userInput += $event.key;
          if ( this.checkInputLabel() ){
            this.userInput = '';
          }
        } else if ( $event.code == "Escape"){
          this.userInput = '';
        } else if ($event.code == "Enter"){
          console.log("user enter label");
          this.checkInputLabel();
          this.userInput = '';
        }
    }

    checkInputLabel(): boolean{
      if( map(this._locate.class, (v)=> v.class).indexOf(this.userInput) != -1 ) {
        let userInput = this.userInput;
        let object = this.selectedObject();
        each(object, (v)=>{
            v.class = userInput;
            v.setStroke(this._locate.getClass(userInput).color);
            v.cornerColor = this._locate.getClass(userInput).color;
        });
        this.stage.renderAll();
        this._collectObject();
        return true;
      };
      return false
    }

    isKey(charCode: number){
      return  (charCode >= 48 && charCode <= 57 ) ||
              (charCode >= 65 && charCode <= 90 ) ||
              (charCode >= 97 && charCode <= 122 )
    }

    @HostListener('document:click', ['$event'])
    declick($event){
        if ( $event.path.indexOf(this.el.nativeElement) == -1 ){
            this.userInput = ''
        }
    }
}

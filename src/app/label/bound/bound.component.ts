import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { fabric } from 'fabric';
import { min, max, each, get } from 'lodash';
import { ProjectService } from '../../project/project.service';
import { BoundSettingService } from './setting/setting.service';
import { DataBus } from '../../project/data/';

@Component({
  selector: '[label-bound]',
  templateUrl: './bound.component.html',
  styleUrls: ['./bound.component.css']
})
export class BoundComponent implements OnInit {
    @Input() type: string;
    @Input() source: any;
    @Input()
    set data(d: any){
      this.__data = d;
      this.populateStage();
    }
    __data: any

    @Input()
    set path(p: string){
        let that = this;
        this._path = p;
        // console.log(p)
        let image = new Image();
        image.onload = function(){
            let img: any = <any>this;
            that.setSize(img.height, img.width)
            that.init()
        };
        image.src = p;
    }

    private _path: string;
    @ViewChild('canvas') canvas: ElementRef;

    constructor(private el: ElementRef,
                private _project: ProjectService,
                private _bound: BoundSettingService,
                private _data: DataBus) { }
    dataHeight: number;
    dataWidth: number;
    scale: number = 1;
    paddingTop: number = 0;
    paddingLeft: number = 0;
    stage: any;
    ready: boolean = false;
    blockEvent: boolean = false;

    ngOnInit() {
        // console.log(fabric)
      // console.log(this.data)
      // console.log(this.data)
    }

    populateStage(){
        if(this.stage){
          this.blockEvent = true;
          this.stage.clear()
          each(get(this.__data, 'box'), (v: any)=>{
              this.addRect(v.x, v.y, v.w, v.h, v.theta || 0)
          });
          this.blockEvent = false;
        }
    }

    init(){
        let dimension = this.el.nativeElement.getBoundingClientRect()
        if ( dimension.width == 0 || this.ready ){
          return
        }
        this.ready = true;
        let scaleW = dimension.height / this.dataHeight;
        let scaleH = dimension.width / this.dataWidth;
        this.scale = min([scaleW, scaleH]);

        this.paddingTop = ( dimension.height - this.dataHeight * this.scale ) / 2 ;
        this.paddingLeft = ( dimension.width - this.dataWidth * this.scale ) / 2 ;

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
          this.populateStage()
        });
    }

    private _collectObject(){
      if(this.blockEvent){
        return;
      }


        let obj = this.stage.getObjects().map((o: any)=>{
            return {x: o.left, y: o.top, w: o.width, h:o.height, theta: o.angle || 0};
        });

        if (obj.length == 0){
          obj = undefined
        }

        this._project.updateLabel(this._bound.projectID, [this.source.id], {box: obj}, undefined)
          .subscribe(()=>{
            each(this._data.datas, (v: any)=>{
              if (this._data.selected.has(v.id)){
                v.label = {box: obj }
              }
            })
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
      width = this.dataWidth * this.scale * 0.1;
      height = width

      x = max([0, x - width / 2])
      y = max([0, y - height / 2])
      this.addRect(x, y)
    }

    addRect(x: number, y: number, width = -1, height = -1, theta = 0){
      if (width <= 0 || height <= 0) {
        width = this.dataWidth * this.scale * 0.1;
        height = width
      }

      this.stage.add(new fabric.Rect({
         left: x,
         top: y,
         width: width,
         height: height,
         stroke: this._bound.getClass().color,
         strokeWidth: 2,
         angle: 0,
         fill: 'rgba(0,0,0,0)',
         cornerColor: this._bound.getClass().color,
         cornerSize: 18,
         transparentCorners: false
     }));
    }

    delete(){
      let object: Array<any> = []
      if (this.stage.getActiveObject()){
        object = [this.stage.getActiveObject()];
      }

      if ( this.stage.getActiveGroup() ){
        object = object.concat(this.stage.getActiveGroup().getObjects())
      }

      each(object, (v)=>{
        v.remove();
      });

      this._collectObject();
    }

    assignLabel(){
      console.log("assign label")
    }
}

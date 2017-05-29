import { Component, OnInit, Input,
        ViewChild, ElementRef, Output,
        EventEmitter, HostListener } from '@angular/core';
import { Map, List } from 'immutable';
import { DataBus } from '../../../project/data/';
import { ProjectService } from '../../../project/project.service';
import { LabelBus } from '../../label.service';
import { each, cloneDeep } from 'lodash';
import { AppState } from '../../../app.service';


@Component({
  selector: 'label-class-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class ClassSettingComponent implements OnInit {
    @Input()
    set config(c: any){
        if(c){
            this._config = Map(c);
            this._config = this._config.update('label', (lbl: any) => {
                if(lbl){
                    return List(lbl);
                } else {
                    return List()
                }
            })
        }
    }

    get config(){
        return this._config;
    }
    _config: any;

    @Input() project: number;

    @Output() update: EventEmitter<any> = new EventEmitter<any>();

    add: boolean = false;
    newclass: string = "";
    @ViewChild('input') input: ElementRef;

    userInput: string = '';

    constructor(private _data: DataBus, private _project: ProjectService, private _state: AppState) { }

    ngOnInit() {}

    addClass(cls: string){
        this._config = this._config.update('label', (lbl: any)=>{
            return lbl.push(cls)
        });
        this.emit()
    }

    delete(cls: string){
        this._config = this._config.update('label', (lbl: any)=>{
            let index = lbl.indexOf(cls);
            return  lbl.delete(index);
        });
        this.emit()
    }

    focus(){
      setTimeout(()=>{
        this.input.nativeElement.focus();
      })
    }

    emit(){
      this.update.emit(this._config.toJSON())
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(ev: any) {
      if (ev.srcElement != document.body){
        return;
      }

      if(this.isKey(ev.which) && !ev.ctrlKey && !ev.metaKey){
        this.userInput += ev.key;
        if ( this.checkInputLabel() ){
          this.userInput = '';
        }
      } else if ( ev.code == "Escape"){
        this.userInput = '';
      } else if ( ev.code == "Delete"){
        this.deleteLabel();
      } else if (ev.code == "Backspace") {
        if(this.userInput.length > 0){
          this.userInput = this.userInput.slice(0,-1)
        }
      } else if (ev.code == "Enter"){
        console.log("user enter label");
        this.checkInputLabel();
        this.userInput = '';
      }
    }

    deleteLabel(){
      this._project.updateLabel(this.project, Array.from(this._data.selected), {}, undefined)
        .subscribe(()=>{
          each(this._data.datas, (v: any)=>{
            if (this._data.selected.has(v.id)){
              v.label = undefined
            }
          })
        });
    }

    checkInputLabel(): boolean{
      if( this._config.get('label').indexOf(this.userInput) != -1 ) {
        let userInput = this.userInput;
        console.log(this._data.selected)
        this._project.updateLabel(this.project, Array.from(this._data.selected), {label: this.userInput}, undefined)
          .subscribe(()=>{
            each(this._data.datas, (v: any)=>{
              if (this._data.selected.has(v.id)){
                v.label = {label: userInput }
              }
            })
          });
        return true;
      };
      return false
    }
    isKey(charCode: number){
      return  (charCode >= 48 && charCode <= 57 ) ||
              (charCode >= 65 && charCode <= 90 ) ||
              (charCode >= 97 && charCode <= 122 )
    }
}

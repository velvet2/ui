import { Component, OnInit, Input,
        ViewChild, ElementRef, Output,
        EventEmitter, HostListener } from '@angular/core';
import { Map, List } from 'immutable';
import { DataBus } from '../../../project/data/';
import { ProjectService } from '../../../project/project.service';
import { LabelBus } from '../../label.service';
import { each, cloneDeep } from 'lodash';
import { AppState } from '../../../app.service';
import { BoundSettingService } from './setting.service';

@Component({
  selector: 'label-bound-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class BoundSettingComponent implements OnInit {
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
            });

            this._config = this._config.update('width', (v: any)=>{
                return v ? v : 10;
            });

            this._config = this._config.update('height', (v: any)=>{
                return v ? v : 10;
            })
        } else {
            this.config = Map({});
        }
    }

    get config(){
        return this._config;
    }
    _config: any;

    @Input()
    set project(pid: string){
        this._bound.projectID = pid;
    }

    @Output() update: EventEmitter<any> = new EventEmitter<any>();

    add: boolean = false;
    newclass: string = "";
    @ViewChild('input') input: ElementRef;

    userInput: string = '';
    color: string = "#000";
    defaultHeight: number = 10;
    defaultWidth: number = 10;

    constructor(private _data: DataBus, private _project: ProjectService, private _state: AppState, private _bound: BoundSettingService) { }

    ngOnInit() {
        this._bound.class = this.config.get('label').toArray()
        this._bound.width = this.defaultWidth = this.config.get('width')
        this._bound.height = this.defaultHeight = this.config.get('height')
    }

    addClass(cls: string, color: string){
        this._config = this._config.update('label', (lbl: any)=>{
            return lbl.push({ class: cls, color: color})
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

    updateSize(){
        this._config  = this._config.update('height', ()=> this.defaultHeight);
        this._config  = this._config.update('width', ()=> this.defaultWidth);
        this.emit();
    }

    emit(){
      this.update.emit(this._config.toJSON())
      this._bound.class = this.config.get('label').toArray();
      this._bound.width = this.config.get('width');
      this._bound.height = this.config.get('height');
    }
}

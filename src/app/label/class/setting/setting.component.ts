import { Component, OnInit, Input,
        ViewChild, ElementRef, Output,
        EventEmitter } from '@angular/core';
import { Map, List } from 'immutable';

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
                    return lbl;
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

    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    add: boolean = false;
    newclass: string = "";
    @ViewChild('input') input: ElementRef;

    cls: Array<string> = new Array<string>();

    constructor() { }

    ngOnInit() {
        this.cls = ['cls 1', 'cls 2', 'cls 3'];
    }

    addClass(cls: string){
        this._config = this._config.update('label', (lbl: any)=>{
            return lbl.push(cls)
        });
    }

    delete(cls: string){
        this._config = this._config.update('label', (lbl: any)=>{
            let index = lbl.indexOf(cls);
            lbl.splice(index, 1)
        });
    }

    focus(){
      setTimeout(()=>{
        this.input.nativeElement.focus();
      })
    }
}

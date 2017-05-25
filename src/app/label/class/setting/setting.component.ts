import { Component, OnInit, Input,
        ViewChild, ElementRef, Output,
        EventEmitter, HostListener } from '@angular/core';
import { Map, List } from 'immutable';
import { DataBus } from '../../../project/data/';
import { LabelBus } from '../../label.service';

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
    userInput: string = '';
    charMatcher = /[A-Za-z0-9]/;

    constructor(private _data: DataBus) { }

    ngOnInit() {
      console.log(this._data)
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

    @HostListener('document:keydown', ['$event'])
    onKeyDown(ev: any) {
      if(this.isKey(ev.which)){
        this.userInput += ev.key;
      } else if ( ev.code == "Escape"){
        console.log("user cancel label")
      } else if ( ev.code == "Delete"){
        console.log("user delete label")
      } else if (ev.code == "Backspace") {
        if(this.userInput.length > 0){
          this.userInput = this.userInput.slice(0,-1)
        }
      } else if (ev.code == "Enter"){
        console.log("user enter label");
        this.userInput = '';
      }
    }

    isKey(charCode: number){
      return  (charCode >= 48 && charCode <= 57 ) ||
              (charCode >= 65 && charCode <= 90 ) ||
              (charCode >= 97 && charCode <= 122 )
    }
}

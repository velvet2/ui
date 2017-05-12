import { Component, OnInit, Input,
        ViewChild, ElementRef, Output,
        EventEmitter } from '@angular/core';

@Component({
  selector: 'label-class-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class ClassSettingComponent implements OnInit {
    @Input() config: any;
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    add: boolean = false;
    newclass: string = "";
    @ViewChild('input') input: ElementRef;

    cls: Array<string> = new Array<string>();

    constructor() { }

    ngOnInit() {
        this.cls = ['cls 1', 'cls 2', 'cls 3'];
        setInterval(()=>{
            console.log(this.config)
        }, 1000)
    }

    log(c){
        console.log(c)
    }

    addClass(cls: string){
      console.log(cls)
      this.cls.push(cls);
    }

    delete(cls: string){
        let index = this.cls.indexOf(cls);
        this.cls.splice(index, 1)
    }

    focus(){
      setTimeout(()=>{
        this.input.nativeElement.focus();
      })
    }
}

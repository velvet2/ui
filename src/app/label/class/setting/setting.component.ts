import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'label-class-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class ClassSettingComponent implements OnInit {
    @Input() type: string;
    add: boolean = false;
    newclass: string = "";
    @ViewChild('input') input: ElementRef;


    constructor() { }

    ngOnInit() {

    }

    log(){
      console.log("yo")
    }

    focus(){
      setTimeout(()=>{
        this.input.nativeElement.focus();
      })
    }
}

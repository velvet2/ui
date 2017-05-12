import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[label-class-setting]',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class ClassSettingComponent implements OnInit {
    @Input() type: string;

    constructor() { }

    ngOnInit() {

    }

}

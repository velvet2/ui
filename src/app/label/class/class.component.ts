import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[label-class]',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
    @Input() type: string;
    @Input() data: any;

    constructor() { }

    ngOnInit() {
      // console.log(this.data)
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { ClassService } from './class.service';

@Component({
  selector: '[label-class]',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
    @Input() type: string;

    constructor(_class: ClassService) { }

    ngOnInit() {

    }

}

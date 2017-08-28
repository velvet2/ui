import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'data-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
    @Input() data: any
    @Input() d: any;

    constructor() { }

    ngOnInit() {}

}

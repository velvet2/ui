import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as fabric from 'fabric';

@Component({
  selector: '[label-bound]',
  templateUrl: './bound.component.html',
  styleUrls: ['./bound.component.css']
})
export class BoundComponent implements OnInit {
    @Input() type: string;
    @Input() data: any;
    @Input()
    set path(p: string){
        let that = this;
        this._path = p;
        // console.log(p)
        let image = new Image();
        image.onload = function(){
            let img: any = <any>this;
            that.setSize(img.height, img.width)
            that.init()
        };
        image.src = p;
    }

    private _path: string;
    @ViewChild('canvas') canvas: ElementRef;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        // console.log(fabric)
      // console.log(this.data)
    }

    init(){
        let dimension = this.el.nativeElement.getBoundingClientRect()
        console.log(dimension.height, this.type, this.el.nativeElement)
    }

    setSize(height: number, width: number){
        this.canvas.nativeElement.setAttribute('height', height);
        this.canvas.nativeElement.setAttribute('width', width);
    }
}

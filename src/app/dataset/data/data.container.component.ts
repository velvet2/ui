import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'data-container',
    templateUrl: './data.container.component.html',
    styleUrls: ['./data.component.css']
})
export class DataContainerComponent implements AfterViewInit {
    @Input() data: any;
    @Input() type: any;
    @Input() selected: false;

    public height: number;
    public width: number;

    constructor(private el: ElementRef){}

    ngAfterViewInit(){
        let dimension = this.el.nativeElement.getBoundingClientRect();
        setTimeout(()=>{
            this.width = dimension.width;
            this.height = dimension.height;
        });
    }
}

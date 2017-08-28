import { Component, Input } from '@angular/core';

@Component({
  selector: 'data-container',
  templateUrl: './data.container.component.html',
  styleUrls: ['./data.component.css']
})
export class DataContainerComponent {
    @Input() data: any;
    @Input() type: any;
    @Input() selected: boolean = false;

    ngOnInit(){}
}

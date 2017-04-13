import { Component, Input } from '@angular/core';

@Component({
  selector: 'data-container',
  templateUrl: './data.container.component.html'
})
export class DataContainerComponent {
    @Input() data: any

    ngOnInit(){
        console.log(this.data);
    }
}
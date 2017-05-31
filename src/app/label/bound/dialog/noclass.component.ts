import { Component } from '@angular/core';

@Component({
  selector: 'dialog-bound',
  template: `
  <h3>No Class Found</h3>
  <div>You must first create a class before creating box</div>
  <button style="float:right" md-button md-dialog-close>OK</button>
  `
})
export class NoClassDialogComponent {

}

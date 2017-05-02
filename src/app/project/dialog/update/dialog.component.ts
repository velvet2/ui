import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    selector: 'dataset-dialog-update',
    templateUrl: './dialog.component.html',
    styleUrls: [ './dialog.component.css' ]
})
export class UploadDatasetDialog {
    allowDrop: boolean = false;
    data: Array<any>;

    constructor(public dialogRef: MdDialogRef<UploadDatasetDialog>) { }

    ngOnInit(){}

    upload(){
        this.dialogRef.close({"data": this.data})
    }
}

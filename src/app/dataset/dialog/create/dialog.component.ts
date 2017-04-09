import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    selector: 'dataset-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: [ './dialog.component.css' ]
})
export class DatasetDialog {
    allowDrop: boolean = false;
    dataName: string = "";
    data: Array<any>;

    constructor(public dialogRef: MdDialogRef<DatasetDialog>) { }

    ngOnInit(){}

    create(){
        if(this.dataName.length != 0){
            this.dialogRef.close({"name": this.dataName, "data": this.data})
        }
    }
}

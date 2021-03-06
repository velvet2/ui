import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DatasetService } from '../../../dataset';

@Component({
    selector: 'project-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: [ './dialog.component.css' ]
})
export class ProjectDialog {
    allowDrop: boolean = false;
    dataName: string = "";
    datas: Array<any> = [];
    labels: Array<any> = [
        {name: "Classification", id: 'class'},
        {name: "Bounding Box", id: 'bbox'},
        {name: "Locating", id: 'locate'},
    ]

    lbl: string;
    dataset: any;

    constructor(public dialogRef: MdDialogRef<ProjectDialog>,
                public _data: DatasetService) { }

    ngOnInit(){
        this._data.listDataset().subscribe((v: any)=>{
            this.datas = v['data'];
        });
    }

    create(){
        this.dialogRef.close({"name": this.dataName,
                            "dataset": this.dataset,
                            "label": this.lbl});
    }
}

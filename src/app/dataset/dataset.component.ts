import { Component, Optional } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { DatasetService } from './dataset.service';
import { AppState } from '../app.service';
import { Dataset } from './dataset';
import { DatasetDialog } from './dialog/create/dialog.component';
import { UploadDatasetDialog } from './dialog/update/dialog.component';

import * as _ from 'lodash';

@Component({
  selector: 'dataset',
  styleUrls: [ './dataset.component.css' ],
  templateUrl: './dataset.component.html'
})
export class DatasetComponent {
    datas: Array<Dataset> = new Array<Dataset>();
    upload_progress: number = 50;
    uploading: boolean = false;
    totalFile: number = 0;
    uploadedFile: number = 0;

    private stateListener: any;

    constructor(private _state: AppState,
                private dialog: MdDialog,
                private _data: DatasetService) { }

    ngOnInit(){
        this.stateListener = this._state.subscribe('dataset.refresh', ()=>{
            this._data.listDataset().subscribe((data: any)=>{
                this.datas = data['data'];
            }, (error)=>{})
        });
        this._state.notifyDataChanged("dataset.refresh", true)
    }

    openCreateDialog() {
        let dialogRef = this.dialog.open(DatasetDialog, {
            disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
            dialogRef = null;
            if(result){
                this.createDataset(result.name, (id)=>{
                    this.uploadData(id, result.data);
                })
            }
        });
    }

    private createDataset(name, callback?){
        this._data.create(name).subscribe(( res: any ) => {
            let response = res.json();
            let datasetId = response.data.id;
            this.datas.push({ "name": name, "id": datasetId});
            if(callback){
                callback.call(null, datasetId);
            }
        });
    }

    uploadData(datasetId: any, data: any) {
        if ( data && data.length > 0){
            this.uploading = true;
            this.totalFile = data.length;
            this.uploadedFile = 0;

            _.each(data, (v : any)=>{
                let form = new FormData();
                form.append('path', v.path)
                form.append("file", v.file);
                this._data.upload(datasetId, form).subscribe(()=>{
                    this.uploadedFile++;
                    this.upload_progress = (this.uploadedFile / this.totalFile ) * 100;
                    if (this.uploadedFile == this.totalFile){
                        this.uploading = false;
                    }
                });
            });
        }
    }

    openUploadDialog(datasetId) {
        let dialogRef = this.dialog.open(UploadDatasetDialog, {
            disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
            dialogRef = null;
            if(result){
                this.uploadData(datasetId, result);
            }
        });
    }

    // openUploadDialog(id: string | number, name: string) {
    //     let dialogRef = this.dialog.open(UploadDialog, {
    //         disableClose: false
    //     });
    //     this._state.notifyDataChanged('upload.data', {id:id, name:name});
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         dialogRef = null;
    //     });
    // }
    //

    delete(id: string){
        this._data.delete(id).subscribe((v: any)=>{
            this._state.notifyDataChanged("dataset.refresh", true);
        });
    }

    ngOnDestroy(){
        this.stateListener.unsubscribe()
    }
}

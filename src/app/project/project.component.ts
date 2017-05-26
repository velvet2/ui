import { Component, Optional } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { ProjectService } from './project.service';
import { AppState } from '../app.service';
import { Project } from './project';

import { ProjectDialog } from './dialog/create/dialog.component';
// import { UploadDatasetDialog } from './dialog/update/dialog.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-project',
  styleUrls: [ './project.component.css' ],
  templateUrl: './project.component.html'
})
export class ProjectComponent {
    projects: Array<Project> = new Array<Project>();
    upload_progress: number = 50;
    uploading: boolean = false;
    totalFile: number = 0;
    uploadedFile: number = 0;

    private stateListener: any;

    constructor(private _state: AppState,
                private dialog: MdDialog,
                private _project: ProjectService) { }

    ngOnInit(){
        this.stateListener = this._state.subscribe('project.refresh', ()=>{
            this._project.getProject().subscribe((project: any)=>{
                this.projects = project;
            }, (error)=>{})
        });
        this._state.notifyDataChanged("project.refresh", true)
    }

    openCreateDialog() {
        let dialogRef = this.dialog.open(ProjectDialog, {
            disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
            dialogRef = null;
            if(result){
                this._project.create(result.name, result.label, result.dataset)
                    .subscribe(()=>{
                        this._state.notifyDataChanged("project.refresh", true)
                    })
            }
        });
    }

    delete(dataset: any){
        this._project.delete(dataset)
            .subscribe(()=>{
                this._state.notifyDataChanged("project.refresh", true)
            })
    }
}

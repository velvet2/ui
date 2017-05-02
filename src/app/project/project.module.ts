import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectService } from './project.service';
import { ProjectComponent } from './project.component';
import { DataComponent } from './data/data.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms'

import { ProjectDialog } from './dialog/create/dialog.component';
// import { UploadDatasetDialog } from './dialog/update/dialog.component';
// import { UploadComponent } from './dialog/upload/upload.component';
import { DatasetService } from '../dataset';
import { DataService } from '../dataset/data';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { DataContainerComponent } from '../dataset/data/data.container.component';

import { DatasetModule } from '../dataset';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ProjectRoutingModule,
    FlexLayoutModule,
    VirtualScrollModule,
    DatasetModule
  ],
  declarations: [
      ProjectComponent,
      ProjectDialog,
      DataComponent
  ],
  providers: [
      ProjectService,
      DatasetService,
      DataService
  ],
  entryComponents: [
      ProjectDialog
    //   ,UploadDatasetDialog
  ],
})
export class ProjectModule { }

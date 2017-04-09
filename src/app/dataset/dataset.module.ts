import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms'

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DatasetRoutingModule } from './dataset-routing.module';
import { DatasetComponent } from './dataset.component';

import { DatasetService } from './dataset.service';

import { DatasetDialog } from './dialog/create/dialog.component';
import { UploadDatasetDialog } from './dialog/update/dialog.component';
import { UploadComponent } from './dialog/upload/upload.component';

// import { UploadDialog } from '../dialog/upload/upload.dialog';
// import { LabelDialog } from '../dialog/label/label.dialog';

@NgModule({
    imports: [
        CommonModule,
        DatasetRoutingModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,

        NgxDatatableModule
    ],
    declarations: [
        DatasetComponent,
        DatasetDialog,
        UploadComponent,
        UploadDatasetDialog
    ],
    providers: [
        DatasetService
    ],
    entryComponents: [
        DatasetDialog,
        UploadDatasetDialog
    ],
})
export class DatasetModule { }

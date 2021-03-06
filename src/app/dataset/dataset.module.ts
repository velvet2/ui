import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms'

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

import { DatasetRoutingModule } from './dataset-routing.module';
import { DatasetComponent } from './dataset.component';
import { DataComponent } from './data/data.component';
import { DataContainerComponent } from './data/data.container.component';

import { DatasetService } from './dataset.service';
import { DataService } from './data/data.service';

import { DatasetDialog } from './dialog/create/dialog.component';
import { UploadDatasetDialog } from './dialog/update/dialog.component';
import { UploadComponent } from './dialog/upload/upload.component';

import { LabelModule } from '../label/label.module';
import { DataModule } from '../data/data.module';

@NgModule({
    imports: [
        CommonModule,
        DatasetRoutingModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
        // DataModule,

        NgxDatatableModule,
        VirtualScrollModule,

        LabelModule,
        DataModule
    ],
    declarations: [
        DatasetComponent,
        DatasetDialog,
        UploadComponent,
        UploadDatasetDialog,
        DataComponent,
        DataContainerComponent
    ],
    providers: [
        DatasetService,
        DataService
    ],
    exports: [
        DataContainerComponent
    ],
    entryComponents: [
        DatasetDialog,
        UploadDatasetDialog
    ],
})
export class DatasetModule { }

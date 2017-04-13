import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@angular/material';

import { ImageComponent } from './image/image.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule
    ],
    declarations: [
        ImageComponent
    ],
    providers: [],
    entryComponents: [],
})
export class DataModule { }

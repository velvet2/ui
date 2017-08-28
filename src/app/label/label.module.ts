import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BoundComponent, BoundSettingComponent, BoundSettingService,
        ClassComponent, ClassSettingComponent,
        LocateComponent, LocateSettingComponent, LocateSettingService,
        LabelBus } from './index';
import { MdListModule, MdIconModule, MdButtonModule,
        MdInputModule, MdChipsModule, MdDialogModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { NoClassDialogComponent } from './bound/dialog/noclass.component';

@NgModule({
  imports: [
    MdListModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    MdChipsModule,
    ColorPickerModule,
    MdDialogModule
  ],
  declarations: [
    ClassComponent,
    ClassSettingComponent,

    BoundComponent,
    BoundSettingComponent,
    NoClassDialogComponent,

    LocateComponent,
    LocateSettingComponent
  ],
  exports: [
    ClassComponent,
    ClassSettingComponent,
    BoundComponent,
    BoundSettingComponent,
    LocateComponent,
    LocateSettingComponent
  ],
  providers: [
    LabelBus,
    BoundSettingService,
    LocateSettingService
  ],
  entryComponents:[
    NoClassDialogComponent
  ]
})
export class LabelModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BoundComponent, BoundSettingComponent, BoundSettingService,
        ClassComponent, ClassSettingComponent,
        LabelBus } from './index';
import { MdListModule, MdIconModule, MdButtonModule, MdInputModule, MdChipsModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';

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
    ColorPickerModule
  ],
  declarations: [
    ClassComponent,
    ClassSettingComponent,
    BoundComponent,
    BoundSettingComponent
  ],
  exports: [
    ClassComponent,
    ClassSettingComponent,
    BoundComponent,
    BoundSettingComponent
  ],
  providers: [
    LabelBus,
    BoundSettingService
  ]
})
export class LabelModule { }

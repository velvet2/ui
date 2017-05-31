import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BoundComponent,
        ClassComponent, ClassSettingComponent, LabelBus } from './index';
import { MdListModule, MdIconModule, MdButtonModule, MdInputModule, MdChipsModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    MdListModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    MdChipsModule
  ],
  declarations: [
    ClassComponent,
    ClassSettingComponent,
    BoundComponent
  ],
  exports: [
    ClassComponent,
    ClassSettingComponent,
    BoundComponent
  ],
  providers: [
    LabelBus
  ]
})
export class LabelModule { }

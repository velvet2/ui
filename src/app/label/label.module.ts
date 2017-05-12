import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClassComponent, ClassSettingComponent, ClassService } from './index';
import { MdListModule, MdIconModule, MdButtonModule, MdInputModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    MdListModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    ClassComponent,
    ClassSettingComponent,
  ],
  exports: [
    ClassComponent,
    ClassSettingComponent
  ],
  providers: [
    ClassService
  ]
})
export class LabelModule { }

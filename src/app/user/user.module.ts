import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { UserRoutingModule } from './user-routing.module';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FlexLayoutModule,

    NgxDatatableModule
  ],
  declarations: [AddComponent, LoginComponent, ListComponent]
})
export class UserModule { }

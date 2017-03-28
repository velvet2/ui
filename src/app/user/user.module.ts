import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { UserRoutingModule } from './user-routing.module';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [AddComponent, LoginComponent]
})
export class UserModule { }

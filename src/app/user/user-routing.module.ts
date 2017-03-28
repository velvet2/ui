import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    { path : '', children: [
        { path : 'login',  component : LoginComponent },
        { path : '',  component : ListComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

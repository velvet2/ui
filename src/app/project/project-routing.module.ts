import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { DataComponent } from './data/data.component';

const routes: Routes = [
    { path : '', children: [
        { path : '',  component : ProjectComponent },
        { path : ':id',  component : DataComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }

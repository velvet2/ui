import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatasetComponent } from './dataset.component';
import { DataComponent } from './data/data.component';

const routes: Routes = [
    { path : '', children: [
        { path : '',  component : DatasetComponent },
        { path : ':id',  component : DataComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasetRoutingModule { }

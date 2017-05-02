import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', children: [] },
    { path: 'user', loadChildren: "./user/user.module#UserModule", data : {preload: true}},
    { path: 'dataset', loadChildren: "./dataset/dataset.module#DatasetModule", data : {preload: true}},
    { path: 'project', loadChildren: "./project/project.module#ProjectModule", data : {preload: true}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

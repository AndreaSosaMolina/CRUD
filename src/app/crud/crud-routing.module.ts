import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from './crud.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:'',
    component: CrudComponent,
    children: [
      {
        path:':id',
        component: FormsModule
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CrudRoutingModule { }

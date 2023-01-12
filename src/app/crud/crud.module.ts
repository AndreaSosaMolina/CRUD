import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudRoutingModule } from './crud-routing.module';
import {MatIconModule} from '@angular/material/icon';





@NgModule({
 
  imports: [
    CommonModule,
    CrudRoutingModule,
    MatIconModule
  ],
  exports: [
    MatIconModule
  ]
})
export class CrudModule { }

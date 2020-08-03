import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAssignmentComponent } from './new-assignment/new-assignment.component';
import { ReassignmentComponent } from './reassignment/reassignment.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

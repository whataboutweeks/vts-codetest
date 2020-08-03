import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// HTTP Modules and In Memory DB imports
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
//UI Modules
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { CamerasComponent } from './cameras/cameras.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { ReassignmentComponent } from './reassignment/reassignment.component';
import { NewAssignmentComponent } from './new-assignment/new-assignment.component';

@NgModule({
  declarations: [
    AppComponent,
    VehiclesComponent,
    CamerasComponent,
    AssignmentsComponent,
    ReassignmentComponent,
    NewAssignmentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //Snagging HTTP requests for the simulated server of In Memory Web api
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    //Adding in ag-Grid
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
//Router imports
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CameraAssignment } from '../cameraAssignment';
import { CameraAssignmentService } from '../cameraAssignment.service';
import { CamerasComponent } from '../cameras/cameras.component';
import { VehiclesComponent } from '../vehicles/vehicles.component';


@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.scss']
})
export class NewAssignmentComponent implements OnInit {
  @ViewChild(CamerasComponent) private camerasComponent: CamerasComponent;
  @ViewChild(VehiclesComponent) private vehiclesComponent: VehiclesComponent;
  @Output() created = new EventEmitter();

  rowsSelected: boolean = false;
  constructor(
    private cameraAssignmentService: CameraAssignmentService
  ) { }

  ngOnInit(): void {
  }

  onRowsSelected(): void {
    if(this.camerasComponent.rowSelected && this.vehiclesComponent.rowSelected) {
      this.rowsSelected = true;
    }

  }

  createAssignment(): void {
    //create the new assignment
    //Needs disable check when both selects aren't made
    const selectedCamera = this.camerasComponent.cameraGrid.api.getSelectedNodes()[0].data;
    const selectedVehicle = this.vehiclesComponent.vehicleGrid.api.getSelectedNodes()[0].data;
    this.cameraAssignmentService.addCameraAssignment({ id:undefined, cameraId:selectedCamera.id, vehicleId:selectedVehicle.id, dateCreated:new Date(), deleted:false } as CameraAssignment).subscribe(() => this.created.emit()); //!!Route back
  }

}

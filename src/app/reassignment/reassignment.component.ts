import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
//Router imports
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CameraAssignment } from '../cameraAssignment';
import { CameraAssignmentService } from '../cameraAssignment.service';
import { CamerasComponent } from '../cameras/cameras.component';
import { VehiclesComponent } from '../vehicles/vehicles.component';
import { ReassignService } from '../reassign.service';


@Component({
  selector: 'app-reassignment',
  templateUrl: './reassignment.component.html',
  styleUrls: ['./reassignment.component.scss']
})
export class ReassignmentComponent implements OnInit {
  @ViewChild(CamerasComponent) private camerasComponent: CamerasComponent;
  @ViewChild(VehiclesComponent) private vehiclesComponent: VehiclesComponent;
  @Output() updated = new EventEmitter();

  rowSelected: boolean = false;
  constructor(
    private cameraAssignmentService: CameraAssignmentService,
    private reassignService: ReassignService
  ) { }

  ngOnInit(): void {
  }

  onRowsSelected(): void {
    if(this.camerasComponent.rowSelected || this.vehiclesComponent.rowSelected) {
      this.rowSelected = true;
    }
    if(this.camerasComponent.rowSelected) {
      this.vehiclesComponent.vehicleGrid.api.setSuppressRowClickSelection(true);
    } else {
      this.camerasComponent.cameraGrid.api.setSuppressRowClickSelection(true);
    }
  }

  clearSelection(): void {
    //Mystery bug. Camera suppress turns off after 2nd click??
    this.vehiclesComponent.vehicleGrid.api.deselectAll();
    this.camerasComponent.cameraGrid.api.deselectAll();
    this.vehiclesComponent.vehicleGrid.api.setSuppressRowClickSelection(false);
    this.camerasComponent.cameraGrid.api.setSuppressRowClickSelection(false);
  }

  closeModal(): void {
    this.updated.emit();
  }

  updateAssignment(): void {
    //update an existing assignment
    //Needs checks if choices aren't made
    let reassignedAssignment: CameraAssignment = this.reassignService.selectedAssignment;
    if(this.camerasComponent.cameraGrid.api.getSelectedNodes().length > 0) {
      reassignedAssignment.cameraId = this.camerasComponent.cameraGrid.api.getSelectedNodes()[0].data.id;
      this.cameraAssignmentService.updateCameraAssignment(reassignedAssignment).subscribe(() => this.updated.emit());
    } else {
      reassignedAssignment.vehicleId = this.vehiclesComponent.vehicleGrid.api.getSelectedNodes()[0].data.id;
      this.cameraAssignmentService.updateCameraAssignment(reassignedAssignment).subscribe(() => this.updated.emit());
    }
  }

}

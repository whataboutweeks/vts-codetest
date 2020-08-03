import { Component, OnInit, ViewChild } from '@angular/core';
//import ag Grid needs
import { AgGridAngular } from 'ag-grid-angular';

import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { CameraAssignment } from '../cameraAssignment';
import { CameraAssignmentService } from '../cameraAssignment.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  @ViewChild('vehicleGrid') vehicleGrid: AgGridAngular;

  vehicles: Vehicle[];

  columnDefs = [
    { headerName: 'Vehicle', field: 'name', sortable: true, filter: true, checkboxSelection: true }
  ];
  constructor(
    private vehicleService: VehicleService,
    private cameraAssignmentService: CameraAssignmentService,
  ) { }

  ngOnInit(): void {
    this.getUnassignedVehicles();
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe(vehicles => this.vehicles = vehicles);
  }

  getUnassignedVehicles(): void {
    //Go get ONLY the unassigned vehicles
    this.cameraAssignmentService.getVehiclesByAssignment(false).subscribe(vehicles => this.vehicles = vehicles);
  }

  getAssignedVehicles(): void {
    //go get ONLY the assigned vehicles, not used right now, but for the future
    this.cameraAssignmentService.getVehiclesByAssignment(true).subscribe(vehicles => this.vehicles = vehicles);

  }

}

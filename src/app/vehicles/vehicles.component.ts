import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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
  @Output() rowClick = new EventEmitter();

  vehicles: Vehicle[];
  rowSelected: boolean = false;

  columnDefs = [
    { headerName: 'Vehicle', field: 'name', sortable: true, filter: true }
  ];
  constructor(
    private vehicleService: VehicleService,
    private cameraAssignmentService: CameraAssignmentService,
  ) { }

  ngOnInit(): void {
    this.getUnassignedVehicles();
  }

  rowSelect(): void {
    console.log('check that button');
    this.rowSelected = this.vehicleGrid.api.getSelectedNodes().length > 0;
    this.rowClick.emit();
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

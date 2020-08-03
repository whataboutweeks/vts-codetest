import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
//import ag Grid needs
import { AgGridAngular } from 'ag-grid-angular';

import { Camera } from '../camera';
import { CameraService } from '../camera.service';
import { CameraAssignment } from '../cameraAssignment';
import { CameraAssignmentService } from '../cameraAssignment.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {
  @ViewChild('cameraGrid') cameraGrid: AgGridAngular;
  @Output() rowClick = new EventEmitter();

  cameras: Camera[];
  rowSelected: boolean = false;

  columnDefs = [
    { headerName: 'Camera Device No.', field: 'deviceNo', sortable: true, filter: true }
  ];
  constructor(
    private cameraService: CameraService,
    private cameraAssignmentService: CameraAssignmentService,
  ) { }

  ngOnInit(): void {
    this.getUnassignedCameras();
  }

  rowSelect(): void {
    console.log('check that button');
    this.rowSelected = this.cameraGrid.api.getSelectedNodes().length > 0;
    this.rowClick.emit();
  }

  getCameras(): void {
    this.cameraService.getCameras().subscribe(cameras => this.cameras = cameras);
  }

  getUnassignedCameras(): void {
    //Go get ONLY the unassigned cameras
    this.cameraAssignmentService.getCamerasByAssignment(false).subscribe(cameras => this.cameras = cameras);
  }

  getAssignedCameras(): void {
    //Go get ONLY the assigned cameras, not used right now, but for the future
    this.cameraAssignmentService.getCamerasByAssignment(true).subscribe(cameras => this.cameras = cameras);
  }

}

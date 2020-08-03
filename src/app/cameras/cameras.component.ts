import { Component, OnInit, ViewChild } from '@angular/core';
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

  cameras: Camera[];

  columnDefs = [
    { headerName: 'Camera Device No.', field: 'deviceNo', sortable: true, filter: true, checkboxSelection: true }
  ];
  constructor(
    private cameraService: CameraService,
    private cameraAssignmentService: CameraAssignmentService,
  ) { }

  ngOnInit(): void {
    this.getUnassignedCameras();
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

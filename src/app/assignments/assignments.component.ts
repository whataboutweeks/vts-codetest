import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
//import ag Grid needs
import { AgGridAngular } from 'ag-grid-angular';

import { CameraAssignment } from '../cameraAssignment';
import { CameraAssignmentService } from '../cameraAssignment.service';
import { ReassignService } from '../reassign.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  @ViewChild('assignmentGrid') assignmentGrid: AgGridAngular;
  @Output() buttonClick = new EventEmitter<string>();


  //Set up columns for grid
  columnDefs = [
    { headerName: 'Vehicle', field: 'vehicle.name', sortable: true, filter: true},
    { headerName: 'Camera', field: 'camera.deviceNo', sortable: true, filter: true},
    { headerName: 'Date Created', field: 'dateCreated', sortable: true, filter: true },
  ];
  //Data for the rows - each assignment
  assignments: [];
  rowSelected: boolean = false;

  constructor(
    private cameraAssignmentService: CameraAssignmentService,
    private reassignService: ReassignService
  ) { }

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments(): void {
    //Getting all the assignments of cameras to vehicles
    this.rowSelected = false;
    this.cameraAssignmentService.getDetailedAssignments().subscribe(assignments => this.assignments = assignments.filter(record => record.deleted == false));
  }

  //TODO Check for buttons that require selection - is something selected ? work : disable
  rowSelect(): void {
    console.log('check that button');
    this.rowSelected = this.assignmentGrid.api.getSelectedNodes().length > 0;
  }

  addAssignment(): void {
    //show the new assignment component and set the routing.
    console.log('New Assignment Started');
    this.buttonClick.emit('new');
  }

  /*
  * FUTURE THOUGHTS on EDIT and REMOVE
  * Currently a single select from the grid and pick your action. Could be useful to have multiselect to bulk update / delete?
  * Another option - add reassign / remove to each grid row as a button. Not sure which is a better UX pattern, + - with both.
  */
  reassignAssignment(): void {
    this.reassignService.updateAssignmentSelection(this.assignmentGrid.api.getSelectedNodes()[0].data);
    console.log(this.assignmentGrid.api.getSelectedNodes()[0].data);
    this.buttonClick.emit('reassign');
  }

  removeAssignment(): void {
    //get selected row, since it's a single select, it will always be first position.
    const selectedData = this.assignmentGrid.api.getSelectedNodes()[0].data;
    selectedData.deleted = true;
    this.cameraAssignmentService.updateCameraAssignment(selectedData).subscribe();
    //grab to the assignments again so everything stays up to date.
    //NOTE - there is probably a more efficient way to do this, but grabbing the assignments
    //again from the DB feels like the safest way to make sure it's all accurate.
    this.getAssignments();
  }

}

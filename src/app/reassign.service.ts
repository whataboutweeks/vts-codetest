import { Injectable } from '@angular/core';
import { CameraAssignment } from './cameraAssignment';


@Injectable({
  providedIn: 'root'
})
export class ReassignService {

  selectedAssignment: CameraAssignment;

  constructor() { }

  updateAssignmentSelection(assignment: CameraAssignment): void {
    this.selectedAssignment = assignment;
  }
}

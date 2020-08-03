import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { AssignmentsComponent } from './assignments/assignments.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(AssignmentsComponent) assignmentsComponent:AssignmentsComponent;
  modal: string = '';
  modalActive: boolean = false;

  title = 'Andy Weeks - Code Test';

  assignmentListRefresh(): void {
    this.assignmentsComponent.getAssignments();
    this.setModal('');
  }

  setModal(modal: string): void {
    this.modal = modal;
  }

  showModal(modal: string): boolean {
    if(modal === this.modal) {
      this.modalActive = true;
      return true;
    }
    this.modalActive = false;
    return false;
  }


}

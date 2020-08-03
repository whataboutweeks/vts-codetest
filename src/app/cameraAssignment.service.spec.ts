import { TestBed } from '@angular/core/testing';

import { CameraAssignmentService } from './cameraAssignment.service';

describe('CameraAssignmentService', () => {
  let service: CameraAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

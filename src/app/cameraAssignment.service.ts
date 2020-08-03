import { Injectable } from '@angular/core';
//rxJS imports
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
//HTTP imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
//Array helpers
import * as _ from 'lodash';


import { CameraAssignment } from './cameraAssignment';
import { Vehicle } from './vehicle';
import { VehicleService } from './vehicle.service';
import { Camera } from './camera';
import { CameraService } from './camera.service';

@Injectable({
  providedIn: 'root'
})
export class CameraAssignmentService {

  private assignmentUrl = 'api/cameraAssignments';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  assignedVehicles: any;

  constructor(
    private http: HttpClient,
    private vehicleService: VehicleService,
    private cameraService: CameraService
  ) { }

  getAssignment(id: number): Observable<CameraAssignment> {
    return this.http.get<CameraAssignment>(this.assignmentUrl)
    .pipe(catchError(this.errorHandling<CameraAssignment>(`getAssignment problem (${id})`)));
  }

  getAssignments(): Observable<CameraAssignment[]> {
    return this.http.get<CameraAssignment[]>(this.assignmentUrl)
    .pipe(catchError(this.errorHandling<CameraAssignment[]>('getAssignments problem', [])));
  }

  getDetailedAssignments(): Observable<any> {
    //Function gets all the camera assignments and joins with vehicle and camera data
    //step1: get the assignments
    return this.http.get<CameraAssignment[]>(this.assignmentUrl)
    .pipe(
      //step2: get the vehicle and camera details for the assignments
      switchMap(assignments => {
        const vehicleIds = _.uniq(assignments.map(assignment => assignment.vehicleId));
        const cameraIds = _.uniq(assignments.map(assignment => assignment.cameraId));
        console.log(vehicleIds);
        //step3: send back all those arrays to join into the assignment object
        return combineLatest(
          of(assignments),
          combineLatest(vehicleIds.map(vehicleId => this.vehicleService.getVehicle(vehicleId))),
          combineLatest(cameraIds.map(cameraId => this.cameraService.getCamera(cameraId)))
        );
      }),
      //step4: spread the assignment properties and add vehcile and camera
      map(([assignments, vehicleIds, cameraIds]) => {
        return assignments.map(assignment => {
          return {
            ...assignment,
            vehicle: _.find(vehicleIds, vehicle => vehicle.id === assignment.vehicleId),
            camera: _.find(cameraIds, camera => camera.id === assignment.cameraId)
          }
        })
      }),
      catchError(this.errorHandling<any>('getAssignments problem'))
    );
  }

  addCameraAssignment(assignment: CameraAssignment): Observable<CameraAssignment> {
    return this.http.post<CameraAssignment>(this.assignmentUrl, assignment, this.httpOptions)
      .pipe(catchError(this.errorHandling<CameraAssignment>('addCameraAssignment problem')));
  }

  updateCameraAssignment(assignment: any): Observable<any> {
    //update a particular camera assignment
    //NOTE updateCameraAssignment takes in any because the assignments get joined. Need a better solution to keep with the sctrict typing.
    return this.http.put(this.assignmentUrl, assignment, this.httpOptions)
    .pipe(catchError(this.errorHandling<any>('updateCameraAssignment problem')));
  }

  //Takes in a boolean, assigned true (yes) or false (no)
  getCamerasByAssignment(assigned: boolean): Observable<Camera[]> {
    //step1: get all the assignments
    return this.http.get<CameraAssignment[]>(this.assignmentUrl)
    .pipe(
      switchMap(assignments => {
        //step2: get unique cameras that aren't in a deletd assignment
        const assignedCameraIds = assignments.filter(assignment => assignment.deleted === false).map(assignment => assignment.cameraId);
        //step3: check if we want assigned or unassigned
        if(assigned) {
          return combineLatest(assignedCameraIds.map(cameraId => this.cameraService.getCamera(cameraId)));
        }
        //step5: for unassigned, compare all cameras to assigned cameras, return the ones not found in assigned
        //variables for readability, it's gross without them.
        let allCameras = this.cameraService.getCameras(),
        assignedCameras = combineLatest(assignedCameraIds.map(cameraId => this.cameraService.getCamera(cameraId)));
        return combineLatest(allCameras, assignedCameras).pipe(
          map(([all, assigned]) => _.differenceWith(all, assigned, _.isEqual))
        );
        }),
        catchError(this.errorHandling<Camera[]>('getCamerasByAssignment problem', []))
      );
    }

    //Takes in a boolean, assigned true (yes) or false (no)
    getVehiclesByAssignment(assigned: boolean): Observable<Vehicle[]> {
      //same logic as getCamerasByAssignment
      return this.http.get<CameraAssignment[]>(this.assignmentUrl)
      .pipe(
        switchMap(assignments => {
          const assignedVehicleIds = assignments.filter(assignment => assignment.deleted === false).map(assignment => assignment.vehicleId);
          if(assigned) {
            return combineLatest(assignedVehicleIds.map(vehicleId => this.vehicleService.getVehicle(vehicleId)));
          }
          let allVehicles = this.vehicleService.getVehicles(),
          assignedVehicles = combineLatest(assignedVehicleIds.map(vehicleId => this.vehicleService.getVehicle(vehicleId)));
          return combineLatest(allVehicles, assignedVehicles).pipe(
            map(([all, assigned]) => _.differenceWith(all, assigned, _.isEqual))
          );
          }),
          catchError(this.errorHandling<Vehicle[]>('getVehiclesByAssignment problem', []))
        );
      }

      //Error Handling based on an example from Angular documentation
      private errorHandling<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          // log to console
          console.error(`${operation}: ${error}`);
          //Give back an empty result to avoid explosions
          return of(result as T);
        };
      }
    }

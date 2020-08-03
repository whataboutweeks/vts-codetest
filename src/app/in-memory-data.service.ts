import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';

import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let vehicles = [
      { id: 1, name: 'Batmobile' },
      { id: 2, name: 'Batwing' },
      { id: 3, name: 'Ecto 1' },
      { id: 4, name: 'The Delorean' }

    ],
    cameras = [
      { id: 1, deviceNo: 3200 },
      { id: 2, deviceNo: 7100 },
      { id: 3, deviceNo: 7200 }
    ],
    cameraAssignments = [
      { id: 1, cameraId: 1, vehicleId: 2, dateCreated: formatDate(new Date(), 'yyyy/MM/dd', 'en'), deleted: false},
      { id: 2, cameraId: 3, vehicleId: 1, dateCreated: formatDate(new Date(), 'yyyy/MM/dd', 'en'), deleted: false},
      { id: 3, cameraId: 2, vehicleId: 4, dateCreated: formatDate(new Date(), 'yyyy/MM/dd', 'en'), deleted: true}
    ];
    //console.log(cameraAssignments);
    return {vehicles, cameras, cameraAssignments};
  }
}

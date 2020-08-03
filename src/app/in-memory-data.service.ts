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
      { id: 4, name: 'The Delorean' },
      { id: 5, name: 'T.A.R.D.I.S.' },
      { id: 6, name: 'Magic School Bus' },
      { id: 7, name: 'Quinjet' },
      { id: 8, name: 'The Mystery Machine' }
    ],
    cameras = [
      { id: 1, deviceNo: 'D3200' },
      { id: 2, deviceNo: 'D7100' },
      { id: 3, deviceNo: 'D7200' },
      { id: 4, deviceNo: 'EOSM6MarkII' },
      { id: 5, deviceNo: 'D810a' },
      { id: 6, deviceNo: 'EOS250D' }

    ],
    cameraAssignments = [
      { id: 1, cameraId: 1, vehicleId: 2, dateCreated: formatDate(new Date(), 'yyyy/MM/dd', 'en'), deleted: false},
      { id: 2, cameraId: 3, vehicleId: 1, dateCreated: formatDate(new Date(), 'yyyy/MM/dd', 'en'), deleted: false},
      { id: 3, cameraId: 2, vehicleId: 4, dateCreated: formatDate(new Date(), 'yyyy/MM/dd', 'en'), deleted: true},
      { id: 4, cameraId: 5, vehicleId: 6, dateCreated: formatDate(new Date(), 'yyyy/MM/dd', 'en'), deleted: false}

    ];
    //console.log(cameraAssignments);
    return {vehicles, cameras, cameraAssignments};
  }
}

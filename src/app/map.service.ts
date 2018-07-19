import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Layer, Marker, icon } from 'leaflet';

import { THINGS } from './mock-markers';

@Injectable()
export class MapService {

  constructor() { }

  getThings(): Observable<Layer[]> {
    return Observable.of(THINGS);
  }
}

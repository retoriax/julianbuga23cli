import { Injectable } from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
//import {BehaviorSubject, Observable, of} from 'rxjs';
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {Observable, of} from "rxjs";

/**
 * Class provides Service to share
 */
@Injectable({
  providedIn: 'root'
})
export class RoutepointServiceService {

  routepoints: Bugapoint[];
  constructor() { }

  getRoute(): Observable<Bugapoint[]> {
    return of(this.routepoints);
  }

  addRoutePoint(routepoint: Bugapoint) {
    this.routepoints.push(routepoint);
    return of(this.routepoints);
  }
  deleteRoutePointById(id: string): Observable<Bugapoint[]> {
    this.routepoints = this.routepoints.filter(item=>item.id!==id);
    return of(this.routepoints);
  }

  moveRoutePointInRoute(previousIndex: number, currentIndex: number): Observable<Bugapoint[]>{
    moveItemInArray(this.routepoints, previousIndex, currentIndex);
    return of(this.routepoints);
  }
  clearRoute(): Observable<Bugapoint[]> {
    this.routepoints = [];
    return of(this.routepoints);
  }
}

import { Injectable } from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {BehaviorSubject} from "rxjs";
import {Routepoint} from "../model/routepoint";

/**
 * Class provides Service to share
 */
@Injectable({
  providedIn: 'root'
})
export class RoutepointServiceService {

  private routepoints: Routepoint[] = [];
  private routepointsSubject = new BehaviorSubject<Routepoint[]>([]);
  readonly routepointsObservable = this.routepointsSubject.asObservable();
  private elementIndex: number = 0;
  constructor() { }

  loadAll() {
    this.routepoints = [];
    this.routepointsSubject.next(this.routepoints);
  }

  addRoutePoint(routepoint: Bugapoint) {
    if (!(this.routepoints.length > 0 && this.routepoints[this.routepoints.length - 1].bugapoint === routepoint)) {
      this.routepoints.push({index : this.elementIndex++, bugapoint : routepoint});
      this.routepointsSubject.next(Object.assign([], this.routepoints));
    }
  }
  deleteRoutePointByIndex(index: number) {
    this.routepoints = this.routepoints.filter(item=>item.index!==index);
    this.routepointsSubject.next(Object.assign([], this.routepoints));
  }

  moveRoutePointInRoute(previousIndex: number, currentIndex: number) {
    moveItemInArray(this.routepoints, previousIndex, currentIndex);
    this.routepointsSubject.next(Object.assign([], this.routepoints));
  }
  clearRoute() {
    this.routepoints = [];
    this.routepointsSubject.next(Object.assign([], this.routepoints));
  }

}

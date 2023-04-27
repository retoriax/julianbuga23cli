import { Injectable } from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {BehaviorSubject} from "rxjs";

/**
 * Service to share a Route consisting of Routepoints.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class RoutepointService {

  private routepoints: Bugapoint[] = [];
  private routepointsSubject = new BehaviorSubject<Bugapoint[]>([]);
  readonly routepointsObservable = this.routepointsSubject.asObservable();

  private mergedRoutepointIndex: number;
  private mergedRoutepointIndexSubject = new BehaviorSubject<number>(-1);
  readonly mergedRoutepointIndexObservable = this.mergedRoutepointIndexSubject.asObservable();

  private unableToAddRoutepointIndex: number;
  private unableToAddRoutepointIndexSubject = new BehaviorSubject<number>(-1);
  readonly unableToAddRoutepointIndexObservable = this.unableToAddRoutepointIndexSubject.asObservable();

  constructor() { }

  addRoutePoint(routepoint: Bugapoint) {
    if (!(this.routepoints.length > 0 && this.routepoints[this.routepoints.length - 1].id === routepoint.id)) {
      this.routepoints.push(routepoint);
      this.routepointsSubject.next(Object.assign([], this.routepoints));
    } else {
      this.unableToAddRoutepointIndex = this.routepoints.length-1;
      this.updateunableToAddRoutepointIndex();
    }
  }

  deleteRoutePointByIndex(index: number) {
    this.routepoints.splice(index, 1);
    this.deleteDoublePoints();
    // Notify any subscribers of the changes
    this.routepointsSubject.next([...this.routepoints]);
  }


  moveRoutePointInRoute(previousIndex: number, currentIndex: number) {
    moveItemInArray(this.routepoints, previousIndex, currentIndex);
    this.deleteDoublePoints();
    this.routepointsSubject.next(Object.assign([], this.routepoints));
  }
  clearRoute() {
    this.routepoints = [];
    this.routepointsSubject.next(Object.assign([], this.routepoints));
  }

  deleteDoublePoints(): void {
    let formerLength = this.routepoints.length;
    let i = 0;
    while (i < this.routepoints.length - 1) {
      if (this.routepoints[i].id === this.routepoints[i + 1].id) {
        console.log(i);
        this.mergedRoutepointIndex = i;
        this.routepoints.splice(i + 1, 1);
      } else {
        i++;
      }
    }
    this.routepointsSubject.next([...this.routepoints]);
    if(formerLength !== this.routepoints.length) {
      this.updateMergedRoutepointIndex();
    }
  }

  updateMergedRoutepointIndex() {
    this.mergedRoutepointIndexSubject.next(this.mergedRoutepointIndex);
  }
  updateunableToAddRoutepointIndex() {
    this.unableToAddRoutepointIndexSubject.next(this.unableToAddRoutepointIndex);
  }

}

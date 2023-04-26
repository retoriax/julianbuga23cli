import { Injectable } from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {BehaviorSubject} from "rxjs";
import {Routepoint} from "../model/routepoint";

/**
 * Class provides Service to share a Route consisting of Routepoints across the
 */
@Injectable({
  providedIn: 'root'
})
export class RoutepointService {

  private routepoints: Routepoint[] = [];
  private routepointsSubject = new BehaviorSubject<Routepoint[]>([]);
  readonly routepointsObservable = this.routepointsSubject.asObservable();
  private elementIndex: number = 0;

  private mergedRoutepointIndex: number;
  private mergedRoutepointIndexSubject = new BehaviorSubject<number>(-1);
  readonly mergedRoutepointIndexObservable = this.mergedRoutepointIndexSubject.asObservable();

  private unableToAddRoutepointIndex: number;
  private unableToAddRoutepointIndexSubject = new BehaviorSubject<number>(-1);
  readonly unableToAddRoutepointIndexObservable = this.unableToAddRoutepointIndexSubject.asObservable();

  constructor() { }

  loadAll() {
    this.routepoints = [];
    this.routepointsSubject.next(this.routepoints);
  }

  addRoutePoint(routepoint: Bugapoint) {
    if (!(this.routepoints.length > 0 && this.routepoints[this.routepoints.length - 1].bugapoint.id === routepoint.id)) {
      this.routepoints.push({index : this.elementIndex++, bugapoint : routepoint});
      this.routepointsSubject.next(Object.assign([], this.routepoints));
    } else {
      this.unableToAddRoutepointIndex = this.routepoints.length-1;
      this.updateunableToAddRoutepointIndex();
    }
  }

  deleteRoutePointByIndex(index: number) {
    this.routepoints = this.routepoints.filter(item => item.index !== index);
    this.deleteDoublePoints();
    this.updateIndex();
    // Notify any subscribers of the changes
    this.routepointsSubject.next([...this.routepoints]);
  }


  moveRoutePointInRoute(previousIndex: number, currentIndex: number) {
    moveItemInArray(this.routepoints, previousIndex, currentIndex);
    this.deleteDoublePoints();
    this.updateIndex();
    this.routepointsSubject.next(Object.assign([], this.routepoints));
  }
  clearRoute() {
    this.routepoints = [];
    this.routepointsSubject.next(Object.assign([], this.routepoints));
  }


  /**
   * Update the indexes of the route points
   */
  updateIndex() {
    this.routepoints.forEach((item, i) => item.index = i);
  }

  deleteDoublePoints(): void {
    let i = 0;
    while (i < this.routepoints.length - 1) {
      if (this.routepoints[i].bugapoint.id === this.routepoints[i + 1].bugapoint.id) {
        this.routepoints.splice(i + 1, 1);
        this.mergedRoutepointIndex = this.routepoints[i].index;
      } else {
        i++;
      }
    }
    this.updateIndex();
    this.routepointsSubject.next([...this.routepoints]);
    this.updateMergedRoutepointIndex();
  }

  updateMergedRoutepointIndex() {
    this.mergedRoutepointIndexSubject.next(this.mergedRoutepointIndex);
    this.mergedRoutepointIndexSubject.next(-1);
  }
  updateunableToAddRoutepointIndex() {
    this.unableToAddRoutepointIndexSubject.next(this.unableToAddRoutepointIndex);
    this.unableToAddRoutepointIndexSubject.next(-1);
  }

}

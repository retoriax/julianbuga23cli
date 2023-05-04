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

  //Represents the route
  private routepoints: Bugapoint[] = [];
  private routepointsSubject = new BehaviorSubject<Bugapoint[]>([]);
  readonly routepointsObservable = this.routepointsSubject.asObservable();

  //provide the corresponding bugapoint-box with the information that Bugapoint could not be added
  private unableToAddRoutepointIndex: number;
  private unableToAddRoutepointIndexSubject = new BehaviorSubject<number>(-1);
  readonly unableToAddRoutepointIndexObservable = this.unableToAddRoutepointIndexSubject.asObservable();


  /**
   * Adds a Bugapoint to the Array of routepoints.
   * If on top of the routepoints array there is already a Bugapoint with the same ID it
   * updates unableToAddRoutepointIndexSubject to display that the point couldn't be added
   * in the corresponding bugapoint-box
   * @param routepoint Added Routepoint
   */
  addRoutePoint(routepoint: Bugapoint) {
    if (!(this.routepoints.length > 0 && this.routepoints[this.routepoints.length - 1].id === routepoint.id)) {
      this.routepoints.push(routepoint);
      this.routepointsSubject.next(Object.assign([], this.routepoints));
    } else {
      this.unableToAddRoutepointIndex = this.routepoints.length-1;
      this.updateunableToAddRoutepointIndex();
    }
  }

  /**
   * Deletes one point from routepoints.
   * Also calls deleteDoublePoints() to ensure no neighbouring Bugapoint that are the same occur
   * @param index
   */
  deleteRoutePointByIndex(index: number) {
    this.routepoints.splice(index, 1);
    this.deleteDoublePoints();
    // Notify any subscribers of the changes
    this.routepointsSubject.next([...this.routepoints]);
  }


  /**
   * Move a Bugapoint in the array of routepoints from one
   * (previous)Index to another (current).
   * Also calls deleteDoublePoints() to ensure no neighbouring Bugapoint that are the same occur
   * @param previousIndex previous index of Bugapoint
   * @param currentIndex current index of Bugapoint/ index the Bugapoint gets moved to
   */
  moveRoutePointInRoute(previousIndex: number, currentIndex: number) {
    moveItemInArray(this.routepoints, previousIndex, currentIndex);
    this.routepointsSubject.next(Object.assign([], this.routepoints));
    this.deleteDoublePoints();
    this.routepointsSubject.next(Object.assign([], this.routepoints));
  }

  /**
   * Reset the whole Array of routepoints.
   */
  clearRoute() {
    this.routepoints = [];
    this.routepointsSubject.next(Object.assign([], this.routepoints));
  }

  /**
   * When a Bugapoint gets deleted or dragged to another Bugapoint this method
   * deletes one Bugapoint if neighbouring a Bugapoint that has the same BugapointID.
   * @private
   */
  private deleteDoublePoints() {
    let i = 0;
    while (i < this.routepoints.length - 1) {
      if (this.routepoints[i].id === this.routepoints[i + 1].id) {
        this.routepoints.splice(i + 1, 1);
      } else {
        i++;
      }
    }
    this.routepointsSubject.next([...this.routepoints]);
  }


  /**
   * Updates unableToAddRoutepointIndexSubject to provide the corresponding
   * bugapoint-box with the
   * information that Bugapoint could not be added
   * @private
   */
  private updateunableToAddRoutepointIndex() {
    this.unableToAddRoutepointIndexSubject.next(this.unableToAddRoutepointIndex);
    this.unableToAddRoutepointIndexSubject.next(-1);
  }

}

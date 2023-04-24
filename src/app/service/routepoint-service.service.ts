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
    if (!(this.routepoints.length > 0 && this.routepoints[this.routepoints.length - 1].bugapoint.id === routepoint.id)) {
      this.routepoints.push({index : this.elementIndex++, bugapoint : routepoint});
      this.routepointsSubject.next(Object.assign([], this.routepoints));
    }
  }
  deleteRoutePointByIndex(index: number) {
    // Find the route point to be deleted
    const routePointToDelete = this.routepoints.find(item => item.index === index);

    if (routePointToDelete) {
      // Get the index of the neighboring route points
      const prevIndex = index - 1;
      const nextIndex = index + 1;

      // Check if the neighboring route points have the same id as the bugapoint of the route point to be deleted
      if (prevIndex >= 0 && this.routepoints[prevIndex].bugapoint.id !== routePointToDelete.bugapoint.id) {
        // Update the neighboring route point as needed
        // ...
      }

      if (nextIndex < this.routepoints.length && this.routepoints[nextIndex].bugapoint.id !== routePointToDelete.bugapoint.id) {
        // Update the neighboring route point as needed
        // ...
      }

      // Remove the route point from the array
      this.routepoints = this.routepoints.filter(item => item.index !== index);

      // Update the indexes of the route points
      this.routepoints.forEach((item, i) => item.index = i);

      // Notify any subscribers of the changes
      this.routepointsSubject.next([...this.routepoints]);
    } else {
      console.warn(`No route point found with index ${index}`);
    }
  }


  moveRoutePointInRoute(previousIndex: number, currentIndex: number) {
    moveItemInArray(this.routepoints, previousIndex, currentIndex);

    // Update the indexes of the route points
    this.routepoints.forEach((item, index) => {
      item.index = index;
    });

    this.routepointsSubject.next(Object.assign([], this.routepoints));
  }
  clearRoute() {
    this.routepoints = [];
    this.routepointsSubject.next(Object.assign([], this.routepoints));
  }

}

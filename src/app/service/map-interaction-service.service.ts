import { Injectable } from '@angular/core';
import {Routepoint} from "../model/routepoint";
import {BehaviorSubject} from "rxjs";
import {Bugapoint} from "../model/bugapoint";

@Injectable({
  providedIn: 'root'
})
export class MapInteractionServiceService {

  private route: Routepoint[] = [];

  private routeSubject = new BehaviorSubject<Routepoint[]>([]);
  readonly routeObservable = this.routeSubject.asObservable();

  private displayedBugapoint = new BehaviorSubject<Bugapoint>(new Bugapoint(-1,-1));
  displayedBugapointObservable = this.displayedBugapoint.asObservable();

  constructor() { }

  showBugapoint(bugapoint: Bugapoint) {
    this.displayedBugapoint.next(bugapoint);
  }


}

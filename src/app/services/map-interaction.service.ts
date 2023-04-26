import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Bugapoint} from "../model/bugapoint";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MapInteractionService {


  private routeSubject = new BehaviorSubject<Bugapoint[]>([]);
  readonly routeObservable = this.routeSubject.asObservable();

  private displayedBugapointSubject = new BehaviorSubject<Bugapoint|null>(null);
  displayedBugapointObservable = this.displayedBugapointSubject.asObservable();

  constructor(private router: Router) { }

  showBugapoint(bugapoint: Bugapoint|null) {
    this.displayedBugapointSubject.next(bugapoint);
    this.router.navigate(['/map']);
  }

  hideBugapoint() {
    this.showBugapoint(null);
  }

  callMapRouting(bugapoints: Bugapoint[]) {
    this.routeSubject.next(bugapoints);
    this.router.navigate(['/map']);
  }

  clearRoute() {
    this.routeSubject.next([]);
  }


}

import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Bugapoint} from "../model/bugapoint";
import {NavigationService} from "./navigation.service";
import {Navigation} from "./navigation";

@Injectable({
  providedIn: 'root'
})
export class MapInteractionService {


  private routeSubject = new BehaviorSubject<Bugapoint[]>([]);
  readonly routeObservable = this.routeSubject.asObservable();

  private displayedBugapointSubject = new BehaviorSubject<Bugapoint|null>(null);
  displayedBugapointObservable = this.displayedBugapointSubject.asObservable();

  constructor(private navigationService: NavigationService) { }

  showBugapoint(bugapoint: Bugapoint|null) {
    this.displayedBugapointSubject.next(bugapoint);
    this.navigationService.navigate(Navigation.Map);
  }

  hideBugapoint() {
    this.showBugapoint(null);
  }

  callMapRouting(bugapoints: Bugapoint[]) {
    this.routeSubject.next(bugapoints);
    this.navigationService.navigate(Navigation.Map);
  }

  clearRoute() {
    this.routeSubject.next([]);
  }


}

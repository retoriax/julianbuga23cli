import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Bugapoint} from "../model/bugapoint";
import {NavigationService} from "./navigation.service";
import {Navigation} from "./navigation";
import {MapFilterComponent} from "../map-components/map-filter/map-filter.component";
import {RoutepointService} from "./routepoint.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MapInteractionService {


  private routeSubject = new BehaviorSubject<Bugapoint[]>([]);
  readonly routeObservable = this.routeSubject.asObservable();

  private displayedBugapointSubject = new BehaviorSubject<Bugapoint|null>(null);
  displayedBugapointObservable = this.displayedBugapointSubject.asObservable();

  routeEvent = new EventEmitter<Bugapoint[]>();

  lastAdded: Bugapoint|undefined;

  constructor(private navigationService: NavigationService, private routePoint: RoutepointService, private snackBar: MatSnackBar) {
    routePoint.routepointsObservable.subscribe((points) => {
      this.lastAdded = points.at(points.length-1);
    });
  }

  showBugapoint(bugapoint: Bugapoint|null) {
    if (bugapoint !== null) this.routeEvent.emit([bugapoint]);
    this.displayedBugapointSubject.next(bugapoint);
    this.navigationService.navigate(Navigation.Map);
  }

  hideBugapoint() {
    this.showBugapoint(null);
  }

  callMapRouting(bugapoints: Bugapoint[]) {
    bugapoints.forEach((point) => this.routeEvent.emit([point]));
    this.routeSubject.next(bugapoints);
    this.navigationService.navigate(Navigation.Map);
  }

  clearRoute() {
    this.routeSubject.next([]);
  }

  addPointToRoute(bugapoint: Bugapoint) {
    if (this.lastAdded?.id == bugapoint.id) {
      this.snackBar.open("Der Punkt\n "+ bugapoint.title + ' \nwurde bereits hinzugefügt!', '', {
        duration:3000,
        verticalPosition:'top'
      });
      return;
    }
    this.routePoint.addRoutePoint(bugapoint);
    this.snackBar.open("Der Punkt\n "+ bugapoint.title + ' \nwurde zur Route hinzugefügt!', '', {
      duration:3000,
      verticalPosition:'top'
    });
  }


}

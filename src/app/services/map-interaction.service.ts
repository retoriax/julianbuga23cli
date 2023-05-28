import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Bugapoint} from "../model/bugapoint";
import {NavigationService} from "./navigation.service";
import {Navigation} from "./navigation";
import {MapFilterComponent} from "../map-components/map-filter/map-filter.component";
import {RoutepointService} from "./routepoint.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";

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

  constructor(private navigationService: NavigationService, private routePoint: RoutepointService, private snackBar: MatSnackBar, private cookieService: CookieService) {
    routePoint.routepointsObservable.subscribe((points) => {
      this.lastAdded = points.at(points.length-1);
    });
    if (this.cookieService.check("currentRoute") && this.cookieService.get("currentRoute").length>6) {
      const bugapointsCookie: Bugapoint[] = JSON.parse(this.cookieService.get("currentRoute"));
      this.routePoint.loadRoute(bugapointsCookie);
      bugapointsCookie.forEach((point) => this.routeEvent.emit([point]));
      this.routeSubject.next(bugapointsCookie);
    }
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

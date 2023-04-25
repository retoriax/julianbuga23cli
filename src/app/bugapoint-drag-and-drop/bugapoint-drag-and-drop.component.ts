import {Component, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {RoutepointServiceService} from "../service/routepoint-service.service";
import {Observable} from "rxjs";
import {Routepoint} from "../model/routepoint";
import {Bugapoint} from "../model/bugapoint";
import {MapInteractionServiceService} from "../service/map-interaction-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bugapoint-drag-and-drop',
  templateUrl: './bugapoint-drag-and-drop.component.html',
  styleUrls: ['./bugapoint-drag-and-drop.component.css']
})
export class BugapointDragAndDropComponent implements OnInit{

  route: Observable<Routepoint[]>;

  constructor(private routePointService: RoutepointServiceService,
              private mapInteractionService: MapInteractionServiceService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.route = this.routePointService.routepointsObservable;
  }

  drop(event: CdkDragDrop<string[]>) {
    this.routePointService.moveRoutePointInRoute(event.previousIndex, event.currentIndex);
  }

  deleteElement(index: number) {
    this.routePointService.deleteRoutePointByIndex(index);
  }

  displayPointOnMap(bugapoint: Bugapoint) {
    this.mapInteractionService.showBugapoint(bugapoint);
    this.router.navigate(['/map']);
  }
}


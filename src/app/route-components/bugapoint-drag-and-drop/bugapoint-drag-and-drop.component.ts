import {Component, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {first, Observable} from "rxjs";

import {Bugapoint} from "../../model/bugapoint";
import {MapInteractionService} from "../../services/map-interaction.service";
import {RoutepointService} from "../../services/routepoint.service";


@Component({
  selector: 'app-bugapoint-drag-and-drop',
  templateUrl: './bugapoint-drag-and-drop.component.html',
  styleUrls: ['./bugapoint-drag-and-drop.component.css']
})

/**
 * This Componet contains Dragables that represent points on a Route
 */
export class BugapointDragAndDropComponent implements OnInit{

  route: Observable<Bugapoint[]>; //Observable of Array of points in the route

  /**
   * Constructor with the Service that stores adds, moves, and delets Points in your route
   * and a Service that makes it possible to navigate to the map and show the route or a point.
   * @param routePointService Lets you manage the points in your route
   * @param mapInteractionService Lets you navigate to the map and show the route or a point
   */
  constructor(private routePointService: RoutepointService,
              private mapInteractionService: MapInteractionService) { }
  ngOnInit(): void {
    //transfer the route from the routePointService
    this.route = this.routePointService.routepointsObservable;

    //updates the points that are merged together
    this.routePointService.mergedRoutepointIndexObservable.
    subscribe(value => {
      if (value >=0) {
        this.mergeHighlightRouteBugapoint(value);
    }});
  }

  /**
   * Drops the Dragables at the certain position in the route
   * @param event
   */
  drop(event: CdkDragDrop<string[]>) {
    this.routePointService.moveRoutePointInRoute(event.previousIndex, event.currentIndex);
  }

  /**
   * Calls a method in the mapInteractionService, which navigates to the /map side
   * and the displays the route
   */
  goToRoute() {
    this.route.pipe(
      first(),
    ).subscribe(routepoints => {
      this.mapInteractionService.callMapRouting(routepoints);
    });
  }

  /**
   * Highlights when two points are merged into one in green (when two points equal are neighbours one is delted)
   * @param routeBugapointIndex Index of merged point
   */
  mergeHighlightRouteBugapoint(routeBugapointIndex: number) {
    const element = document.querySelector(`.example-list .routepoint-box:nth-child(${routeBugapointIndex + 1})`);
    if (element) {
      element.classList.add('mergeHighlight');
      setTimeout(() => {
        element.classList.remove('mergeHighlight');
      }, 1000);
    }
  }
}


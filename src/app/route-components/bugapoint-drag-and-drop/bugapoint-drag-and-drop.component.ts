import {Component, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {RoutepointService} from "../../service/routepoint.service";
import {first, Observable} from "rxjs";
import {Routepoint} from "../../model/routepoint";
import {Bugapoint} from "../../model/bugapoint";
import {MapInteractionService} from "../../service/map-interaction.service";

@Component({
  selector: 'app-bugapoint-drag-and-drop',
  templateUrl: './bugapoint-drag-and-drop.component.html',
  styleUrls: ['./bugapoint-drag-and-drop.component.css']
})
export class BugapointDragAndDropComponent implements OnInit{

  route: Observable<Routepoint[]>;

  constructor(private routePointService: RoutepointService,
              private mapInteractionService: MapInteractionService) {
  }
  ngOnInit(): void {
    this.route = this.routePointService.routepointsObservable;

    this.routePointService.mergedRoutepointIndexObservable.
    subscribe(value => {
      if (value >=0) {
        this.deleteHighlightRouteBugapoint(value);
    }});

    this.routePointService.unableToAddRoutepointIndexObservable.
    subscribe(value => {
      if (value >=0) {
        this.addHighlightRouteBugapoint(value);
      }});
  }

  drop(event: CdkDragDrop<string[]>) {
    this.routePointService.moveRoutePointInRoute(event.previousIndex, event.currentIndex);
  }

  deleteElement(index: number) {
    this.routePointService.deleteRoutePointByIndex(index);
  }

  displayPointOnMap(bugapoint: Bugapoint) {
    this.mapInteractionService.showBugapoint(bugapoint);
  }

  /**
   * highlights one
   * @param routeBugapointIndex
   */
  deleteHighlightRouteBugapoint(routeBugapointIndex: number) {
    const element = document.querySelector(`.example-list .routepoint-box:nth-child(${routeBugapointIndex + 1})`);
    if (element) {
      element.classList.add('addHighlight');
      setTimeout(() => {
        element.classList.remove('addHighlight');
      }, 1000);
    }
  }

  addHighlightRouteBugapoint(routeBugapointIndex: number) {
    const element = document.querySelector(`.example-list .routepoint-box:nth-child(${routeBugapointIndex + 1})`);
    if (element) {
      element.classList.add('unableToAddHighlight');
      setTimeout(() => {
        element.classList.remove('unableToAddHighlight');
      }, 1000);
    }
  }

  goToRoute() {
    this.route.pipe(
      first(),
    ).subscribe(routepoints => {
      const bugapoints: Bugapoint[] = routepoints.map((routepoint) => routepoint.bugapoint);
      this.mapInteractionService.callMapRouting(bugapoints);
    });
  }

}


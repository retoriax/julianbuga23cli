import {Component, OnInit} from '@angular/core';
//import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Bugapoint} from "../model/bugapoint";
import {RoutepointServiceService} from "../service/routepoint-service.service";

@Component({
  selector: 'app-bugapoint-drag-and-drop',
  templateUrl: './bugapoint-drag-and-drop.component.html',
  styleUrls: ['./bugapoint-drag-and-drop.component.css']
})
export class BugapointDragAndDropComponent implements OnInit{

  route: Bugapoint[] = [];

  constructor(private routePointService: RoutepointServiceService) {
  }
  ngOnInit(): void {
    this.getRoute();
  }

  drop(event: CdkDragDrop<string[]>) {
    this.routePointService.moveRoutePointInRoute(event.previousIndex, event.currentIndex)
      .subscribe(route => this.route = route);
  }

  deleteElement(id: string) {
    this.routePointService.deleteRoutePointById(id)
      .subscribe(route => this.route = route);
  }

  getRoute(): void {
    this.routePointService.getRoute()
      .subscribe(route => this.route = route);
  }
}


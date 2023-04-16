import {Component, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {RoutepointServiceService} from "../service/routepoint-service.service";
import {Observable} from "rxjs";
import {Routepoint} from "../model/routepoint";

@Component({
  selector: 'app-bugapoint-drag-and-drop',
  templateUrl: './bugapoint-drag-and-drop.component.html',
  styleUrls: ['./bugapoint-drag-and-drop.component.css']
})
export class BugapointDragAndDropComponent implements OnInit{

  route: Observable<Routepoint[]>;

  constructor(private routePointService: RoutepointServiceService) {
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
}


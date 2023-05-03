import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Bugapoint} from "../../model/bugapoint";
import {RoutepointService} from "../../services/routepoint.service";
import {MapInteractionService} from "../../services/map-interaction.service";


@Component({
  selector: 'app-bugapoint-box',
  templateUrl: './bugapoint-box.component.html',
  styleUrls: ['./bugapoint-box.component.css']
})
export class BugapointBoxComponent implements OnChanges{
  @Input()
  point: Bugapoint;
  @Input()
  index: number;
  mergeHighlight: boolean;
  unableToAddHighlight: boolean;


  /**
   * Constructor with the Service that stores adds, moves, and delets Points in your route
   * and a Service that makes it possible to navigate to the map and show the route or a point.
   * @param routePointService Lets you manage the points in your route
   * @param mapInteractionService Lets you navigate to the map and show the route or a point
   */
  constructor(private routePointService: RoutepointService,
              private mapInteractionService: MapInteractionService) { }

  ngOnChanges(changes: SimpleChanges) {
    //updates the points that are merged together
    this.routePointService.mergedRoutepointIndexObservable.
    subscribe(value => {
      if (value === this.index) {
        this.mergeHighlightRouteBugapoint();
      }});
  }

  ngOnInit() {
    //updates the points that are merged together
    this.routePointService.mergedRoutepointIndexObservable.
    subscribe(value => {
      if (value === this.index) {
        this.mergeHighlightRouteBugapoint();
      }});
    //updates the last point if the user tries to add the same point twice
    this.routePointService.unableToAddRoutepointIndexObservable.
    subscribe(value => {
      if (value === this.index) {
        this.unableToAddHighlightRouteBugapoint();
      }});
  }
  /**
   * Deletes a Bugapoint from the route by its index in the route
   * @param index Index of Bugapoint
   */
  deleteElement(index: number) {
    this.routePointService.deleteRoutePointByIndex(index);
  }

  /**
   * Navigates to the /map site and displays a certain bugapoint,
   * if the location icon for a point of the route is clicked
   * @param bugapoint Displayed Bugapoint
   */
  displayPointOnMap(bugapoint: Bugapoint) {
    this.mapInteractionService.showBugapoint(bugapoint);
  }


  /**
   * Highlights when it is not possible to add the same point twice in red
   */
  unableToAddHighlightRouteBugapoint() {
    // set highlight to true
    this.unableToAddHighlight = true;

    // reset highlight after 1 second
    setTimeout(() => {
      this.unableToAddHighlight = false;
    }, 1000);
  }

  mergeHighlightRouteBugapoint() {
    console.log(this.index + " " + this);
    // set highlight to true
    this.mergeHighlight = true;

    // reset highlight after 1 second
    setTimeout(() => {
      this.mergeHighlight = false;
    }, 10000);
  }
}

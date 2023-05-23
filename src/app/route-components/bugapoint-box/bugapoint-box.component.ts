import {Component, Input} from '@angular/core';
import {Bugapoint} from "../../model/bugapoint";
import {RoutepointService} from "../../services/routepoint.service";
import {MapInteractionService} from "../../services/map-interaction.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-bugapoint-box',
  templateUrl: './bugapoint-box.component.html',
  styleUrls: ['./bugapoint-box.component.css']
})
export class BugapointBoxComponent {
  @Input()
  point: Bugapoint;
  @Input()
  index: number;

  mergeHighlight: boolean; //boolean to add class.mergeHighlight to highlight component in css
  unableToAddHighlight: boolean; //boolean to add class.unableToAddHighlight to highlight component in css


  /**
   * Constructor with the Service that stores adds, moves, and delets Points in your route
   * and a Service that makes it possible to navigate to the map and show the route or a point.
   * @param routePointService Lets you manage the points in your route
   * @param mapInteractionService Lets you navigate to the map and show the route or a point
   * @param snackBar
   */
  constructor(private routePointService: RoutepointService,
              private mapInteractionService: MapInteractionService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    //updates the points that are merged together
    this.routePointService.routepointsObservable.subscribe(value => {
      if (value.length > this.index + 1 && value[this.index]?.id === value[this.index + 1]?.id) {
        this.mergeHighlightRouteBugapoint();
      }
    })
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
   * Highlights the bugapoint-box when it is not possible to add the same point twice in red
   */
  unableToAddHighlightRouteBugapoint() {
    // set highlight to true
    this.unableToAddHighlight = true;
    this.snackBar.open(this.point.title + 'ist schon vorhanden!', '', {
      duration:3000,
      verticalPosition:'top'
    });

    // reset highlight after 1 second
    setTimeout(() => {
      this.unableToAddHighlight = false;
    }, 1000);
  }

  /**
   * Highlights the bugapoint-box when two points are merged together into one
   */
  mergeHighlightRouteBugapoint() {
    // set highlight to true
    this.mergeHighlight = true;
    this.snackBar.open(this.point.title + 'wurde mit dem selben Routenpunkt vereint!', '', {
      duration:3000,
      verticalPosition:'top'
    });

    // reset highlight after 1 second
    setTimeout(() => {
      this.mergeHighlight = false;
    }, 10000);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, mergeAll, Observable, startWith, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bugapoint } from "../../model/bugapoint";
import { RoutepointErrorstateMatcher } from "./RoutepointErrorstateMatcher";
import { BugapointService } from "../../services/bugapoint.service";
import { RoutepointService } from "../../services/routepoint.service";

@Component({
  selector: 'app-bugapoint-autocomplete-field',
  templateUrl: './bugapoint-autocomplete-field.component.html',
  styleUrls: ['./bugapoint-autocomplete-field.component.css']
})

/**
 * This Component consist of an Autocomplete field with all
 * Bugapoints from the Database as options and a button to add them to the route
 */
export class BugapointAutocompleteFieldComponent implements OnInit {
  myControl = new FormControl<string | Bugapoint>('');
  filteredBugapoints: Observable<Bugapoint[]>;
  databaseBugapoints: Bugapoint[] = [];
  newElement: Bugapoint | string;
  routePointErrorStateMatcher = new RoutepointErrorstateMatcher();

  /**
   * Constructor with the Service that makes calls to the database
   * and a Service that stores adds, moves, and delets Points in your route.
   * @param bugapointservice
   * @param routepointservice
   */
  constructor(
    private bugapointservice: BugapointService,
    private routepointservice: RoutepointService
  ) {}

  ngOnInit() {
    this.loadBugapoints();
    this.filteredBugapoints = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const title = typeof value === 'string' ? value : value?.title;
        return this.filterBugapoints(title as string);
      }),
      mergeAll()
    );
  }

  loadBugapoints() {
    this.bugapointservice.findAll('orderBy=title').subscribe(
      (bugapoints: Bugapoint[]) => {
        this.databaseBugapoints = bugapoints;
      }
    );
  }

  filterBugapoints(searchTitle: string): Observable<Bugapoint[]> {
    const filteredBugapoints = this.databaseBugapoints.filter(bugapoint =>
      bugapoint.title.toLowerCase().includes(searchTitle.toLowerCase().trim())
    );
    return this.createObservable(filteredBugapoints);
  }

  createObservable(data: Bugapoint[]): Observable<Bugapoint[]> {
    return new Observable<Bugapoint[]>(observer => {
      observer.next(data);
      observer.complete();
    });
  }

  displayFn(bugapoint: Bugapoint): string {
    return bugapoint && bugapoint.title ? bugapoint.title : '';
  }


  /**
   * Submits the input and adds the Bugapoint to the list of routepoints if possible.
   * Otherwise sets routePointErrorStateMatcher into an alarm
   */
  submit() {
    if (this.newElement && typeof this.newElement !== 'string') {
      this.routePointErrorStateMatcher.isValid();
      this.routepointservice.addRoutePoint(this.newElement);
      this.newElement = "";
    } else {
      this.routePointErrorStateMatcher.isFalse();
      this.findBugapointByTitle(this.newElement as string);
    }
  }


  /**
   * Searches a Bugapoint which title correspond with the input string
   * @param searchString
   */
  findBugapointByTitle(searchString: string) {
    const searchByString: Observable<Bugapoint | undefined> = this.filteredBugapoints.pipe(
      filter((arr: Bugapoint[]) => arr.some((item: Bugapoint) => item.title === searchString)),
      map((arr: Bugapoint[]) => arr.find((item: Bugapoint) => item.title === searchString)),
      take(1)
    );
    searchByString.subscribe((item: Bugapoint | undefined) => {
      if (item === undefined) {
        console.log("myFilteredObservable contains an undefined value");
      } else {
        this.routePointErrorStateMatcher.isValid();
        this.routepointservice.addRoutePoint(item);
        this.newElement = "";
      }
    });
  }
}

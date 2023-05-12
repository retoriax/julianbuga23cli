import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {filter, mergeAll, Observable, take} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Bugapoint} from "../../model/bugapoint";
import {RoutepointErrorstateMatcher} from "./RoutepointErrorstateMatcher";
import {BugapointService} from "../../services/bugapoint.service";
import {RoutepointService} from "../../services/routepoint.service";

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
  //content of the autocompletefield
  myControl = new FormControl<string | Bugapoint>('');
  filteredBugapoints: Observable<Bugapoint[]>;
  datbaseBugapoints: Observable<Bugapoint[]>;
  newElement: (Bugapoint|string);
  routePointErrorStateMatcher = new RoutepointErrorstateMatcher();


  /**
   * Constructor with the Service that makes calls to the database
   * and a Service that stores adds, moves, and delets Points in your route.
   * @param bugapointservice
   * @param routepointservice
   */
 constructor(private bugapointservice: BugapointService,
             private routepointservice: RoutepointService) {
 }

  /**
   *
   * @param searchtitle
   */
  lookup(searchtitle: string): Observable<Bugapoint[]> {
    return this.datbaseBugapoints.pipe(map(value =>
      value.filter(value1 =>
        value1.title.toLowerCase().trim().includes(searchtitle.toLowerCase().trim()))));
  }

  ngOnInit() {
    this.datbaseBugapoints = this.bugapointservice.findAll('orderBy=title');
    this.filteredBugapoints = this.myControl.valueChanges.pipe(
      startWith(''),
      // delay emits
      //debounceTime(300),
      map(value => {
        const title = typeof value === 'string' ? value : value?.title;
        return this.lookup(title as string);
      }),
      mergeAll(),
    );
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
      const searchByString: Observable<Bugapoint|undefined> = this.filteredBugapoints.pipe(
        // filter the array to find the first element of type MyType
        filter((arr: Bugapoint[]) => arr.some((item: Bugapoint) => item.title === searchString)),
        // map the filtered array to the first element of type MyType
        map((arr: Bugapoint[]) => arr.find((item: Bugapoint) => item.title === searchString)),
        //only call this once
        take(1)
      );
      //looks up whether a Bugapoint was found or not
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



import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {filter, mergeAll, Observable, take} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Bugapoint} from "../model/bugapoint";
import {RoutepointServiceService} from "../service/routepoint-service.service";
import {RoutepointErrorstateMatcher} from "./RoutepointErrorstateMatcher";
import {ErrorStateMatcher} from "@angular/material/core";
import {BugapointService} from "../services/bugapoint.service";

@Component({
  selector: 'app-bugapoint-autocorrect-field',
  templateUrl: './bugapoint-autocorrect-field.component.html',
  styleUrls: ['./bugapoint-autocorrect-field.component.css']
})
export class BugapointAutocorrectFieldComponent implements OnInit {
  myControl = new FormControl<string | Bugapoint>('');
  filteredBugapoints: Observable<Bugapoint[]>;
  newElement: (Bugapoint|string);
  routePointErrorStateMatcher = new RoutepointErrorstateMatcher();
  matcher = new ErrorStateMatcher();

 constructor(private bugapointservice: BugapointService,
             private routepointservice: RoutepointServiceService) {
 }

  lookup(value: string): Observable<Bugapoint[]> {
    return this.bugapointservice.searchByTitle(value);
  }

  ngOnInit() {
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


    findBugapointByTitle(searchString: string) {
      const searchByString: Observable<Bugapoint|undefined> = this.filteredBugapoints.pipe(
        // filter the array to find the first element of type MyType
        filter((arr: Bugapoint[]) => arr.some((item: Bugapoint) => item.title === searchString)),
        // map the filtered array to the first element of type MyType
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



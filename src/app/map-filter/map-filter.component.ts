import { Component, OnInit } from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {BugapointServiceService} from "../service/bugapoint-service.service";
import {FormControl} from '@angular/forms';
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.css']
})



export class MapFilterComponent implements OnInit{
  bugapoints: Bugapoint[];
  discriminators = new FormControl('');

  filteredBugapoints: Bugapoint[];

  discriminatorSet = new Set();
  private filteredBugapointsBehaviorSubject = new BehaviorSubject(<Bugapoint[]>([]));
  currentBugapoints = this.filteredBugapointsBehaviorSubject.asObservable();


  constructor(private bugapointservice: BugapointServiceService) {
  }


  ngOnInit() {
    this.bugapointservice.getData().subscribe((data: any) => {
      this.bugapoints = data;
      for (const bugapoint of this.bugapoints) {
        this.discriminatorSet.add(bugapoint.discriminator);
      }
      this.filterBugapoints();
    });

    this.discriminators.valueChanges.subscribe(() => {
      this.filterBugapoints();
      console.log(this.filteredBugapoints);
    });
    this.filteredBugapointsBehaviorSubject.next(this.filteredBugapoints)
  }

  changeCurrentBugapoints(bugapoints: Bugapoint[]) {
    this.filteredBugapointsBehaviorSubject.next(bugapoints);
  }

  filterBugapoints() {
    const selectedDiscriminators = this.discriminators.value!;
    if (selectedDiscriminators.length === 0) {
      this.filteredBugapoints = this.bugapoints;
      return;
    }

    this.filteredBugapoints = this.bugapoints.filter((bugapoint) =>
      selectedDiscriminators.includes(bugapoint.discriminator)
    );
    this.changeCurrentBugapoints(this.filteredBugapoints);
  }

}

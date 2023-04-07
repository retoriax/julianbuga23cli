import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {BugapointServiceService} from "../service/bugapoint-service.service";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.css']
})


export class MapFilterComponent implements OnInit{
  @Output() filteredBugapointsChange = new EventEmitter<Bugapoint[]>();
  bugapoints: Bugapoint[];
  discriminators = new FormControl('');

  filteredBugapoints: Bugapoint[] = [];

  discriminatorSet = new Set();


  constructor(private bugapointservice: BugapointServiceService) {}

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
    });
  }

  filterBugapoints() {
    const selectedDiscriminators = this.discriminators.value!;
    if (selectedDiscriminators.length === 0) {
      this.filteredBugapoints = this.bugapoints;
    } else {
      this.filteredBugapoints = this.bugapoints.filter((bugapoint) =>
        selectedDiscriminators.includes(bugapoint.discriminator));
    }
    this.filteredBugapointsChange.emit(this.filteredBugapoints);
  }
}

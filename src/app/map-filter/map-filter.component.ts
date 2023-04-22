import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {FormControl} from '@angular/forms';
import {BugapointService} from "../services/bugapoint.service";

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.css']
})


export class MapFilterComponent implements OnInit{
  @Output() filteredBugapointsChange = new EventEmitter<Bugapoint[]>();
  discriminators = new FormControl('');

  discriminatorSet = new Set();

  constructor(private bugapointservice: BugapointService) {}

  ngOnInit() {
    /**
     * Css Styling
     */
    const checkbox = document.getElementById('check') as HTMLInputElement;
    const filterList = document.querySelector('.filter-list') as HTMLElement;

    checkbox.addEventListener('change', (event) => {
      if ((event.target as HTMLInputElement).checked) {
        filterList.classList.add('shown');
      } else {
        filterList.classList.remove('shown');
      }
    });

    this.bugapointservice.getDiscriminators().subscribe((data: any) => {
      console.log(data);
      this.discriminatorSet = data;
    })



    this.bugapointservice.findAll().subscribe(allbugapoints => {
      this.filteredBugapointsChange.emit(allbugapoints);
    })

    this.discriminators.valueChanges.subscribe(() => {
      const selectedDiscriminators: Set<string> = new Set<string>([this.discriminators.value!]);
      this.bugapointservice.getFilteredBugapoints(selectedDiscriminators).subscribe(filteredBugapoints => {
        this.filteredBugapointsChange.emit(filteredBugapoints);
      });
    });

  }
}

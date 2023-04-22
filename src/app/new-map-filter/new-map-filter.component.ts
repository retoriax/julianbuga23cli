import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Bugapoint } from "../model/bugapoint";
import { BugapointServiceService } from "../service/bugapoint-service.service";

@Component({
  selector: 'app-new-map-filter',
  templateUrl: './new-map-filter.component.html',
  styleUrls: ['./new-map-filter.component.css']
})
export class NewMapFilterComponent implements OnInit {
  @Output() filteredBugapointsChange = new EventEmitter<Bugapoint[]>();
  @ViewChild('chipList') chipList: any;

  discriminatorSet = new Set<string>();
  selectedDiscriminators = new Set<string>();

  constructor(private bugapointservice: BugapointServiceService) {}

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
      this.discriminatorSet = data;
    });

    this.bugapointservice.findAll().subscribe(allbugapoints => {
      this.filteredBugapointsChange.emit(allbugapoints);
    });
  }

  toggleSelection(discriminator: string): void {
    if (this.selectedDiscriminators.has(discriminator)) {
      this.selectedDiscriminators.delete(discriminator);
    } else {
      this.selectedDiscriminators.add(discriminator);
    }
    console.log(this.selectedDiscriminators);
    this.filterBugapoints();
  }

  filterBugapoints(): void {
    this.bugapointservice.filterBugapoints(this.selectedDiscriminators).subscribe(filteredBugapoints => {
      this.filteredBugapointsChange.emit(filteredBugapoints);
    });
  }
}

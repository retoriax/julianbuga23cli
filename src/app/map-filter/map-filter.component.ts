import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Bugapoint } from '../model/bugapoint';
import {BugapointService} from "../services/bugapoint.service";

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.css']
})
export class MapFilterComponent implements OnInit {
  // Event, welches die gefilterten Bugapoints an die Parent-Komponente sendet
  @Output() filteredBugapointsChange = new EventEmitter<Bugapoint[]>();
  // Referenz zur MatChipList
  @ViewChild('chipList') chipList: any;
  // Flag, ob alle Chip-Optionen ausgewählt sind
  alleSelected = true;

  // Set, welches alle möglichen Diskriminatoren enthält
  discriminatorSet = new Set<string>();
  // Set, welches alle aktuell ausgewählten Diskriminatoren enthält
  selectedDiscriminators = new Set<string>();

  constructor(private bugapointservice: BugapointService) {}

  ngOnInit() {
    /**
     * Css Styling
     */
    const checkbox = document.querySelector('#check') as HTMLInputElement;
    const filterList = document.querySelector('.filter-list') as HTMLElement;
    const filterButton = document.querySelector('.filter-button') as HTMLElement;

    checkbox.addEventListener('change', (event) => {
      if ((event.target as HTMLInputElement).checked) {
        filterList.classList.add('shown');
      } else {
        filterList.classList.remove('shown');
      }
    });

    document.addEventListener('click', function(event) {
      if (checkbox.checked) {
        const mapFilters = document.querySelector('.filter-list');
        let isClickInsideFilter = mapFilters?.contains(event.target as Element);
        let isClickInsideFilterButton = filterButton?.contains(event.target as Element);
        if (!isClickInsideFilter && !isClickInsideFilterButton) {
          filterList.classList.remove('shown');
          checkbox.checked = false;
        }
      }
    });


    // Abfrage aller möglichen Diskriminatoren von der Datenbank
    this.bugapointservice.getDiscriminators().subscribe((data: any) => {
      this.discriminatorSet = new Set<string>(data);
      this.selectedDiscriminators = new Set<string>(data);
    });

    // Abfrage aller Bugapoints von der Datenbank
    this.bugapointservice.findAll().subscribe(allbugapoints => {
      // Initialer Filter auf alle Bugapoints
      this.filteredBugapointsChange.emit(allbugapoints);
    });
  }

  // Funktion, um die Auswahl eines Diskriminators zu toggeln
  toggleSelection(discriminator: string): void {
    if (this.selectedDiscriminators.has(discriminator)) {
      this.selectedDiscriminators.delete(discriminator);
    } else {
      this.selectedDiscriminators.add(discriminator);
    }

    // Überprüfung, ob alle Optionen ausgewählt sind
    if (this.selectedDiscriminators.size == this.discriminatorSet.size) {
      this.alleSelected = true;
    } else {
      this.alleSelected = false;
    }

    // Ausführen des Filters
    this.filterBugapoints();
  }

  // Funktion, um die Bugapoints entsprechend der ausgewählten Diskriminatoren zu filtern
  filterBugapoints(): void {
    this.bugapointservice.getFilteredBugapoints(this.selectedDiscriminators).subscribe(filteredBugapoints => {
      // Aussenden der gefilterten Bugapoints an die Parent-Komponente
      this.filteredBugapointsChange.emit(filteredBugapoints);
    });
  }

  // Funktion, um alle Chip-Optionen auszuwählen
  alleAuswaehlen() {
    if (this.alleSelected) {
      this.alleSelected = false;
      this.selectedDiscriminators = new Set<string>();
      this.filteredBugapointsChange.emit([]);
      return;
    }
    this.alleSelected = true;
    this.selectedDiscriminators = new Set(this.discriminatorSet);
    this.bugapointservice.findAll().subscribe(bugapoints => {
      this.filteredBugapointsChange.emit(bugapoints);
    })
  }
}

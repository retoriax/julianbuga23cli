import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Bugapoint } from '../../model/bugapoint';
import {BugapointService} from "../../services/bugapoint.service";
import {CookieService} from "ngx-cookie-service";
import {MapInteractionService} from "../../services/map-interaction.service";

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.css']
})
export class MapFilterComponent implements OnInit {
  @Output() filteredBugapointsChange = new EventEmitter<Bugapoint[]>();
  @ViewChild('chipList') chipList: any;
  alleSelected = true;


  discriminatorSet = new Set<string>();
  selectedDiscriminators = new Set<string>();

  bugapoints: Bugapoint[];

  constructor(private bugapointservice: BugapointService, private cookieService: CookieService, private mapInteraction: MapInteractionService) {}

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

    /**
     * Get bugapoints from database.
     */
    this.updateBugapoints();

    /**
     * Get Discriminators form database..
     */
    this.bugapointservice.getDiscriminators().subscribe((data: any) => {
      this.discriminatorSet = new Set<string>(data);

      if (this.cookieService.check("selectedDiscriminators")) {
          this.selectedDiscriminators = new Set<string>(this.cookieService.get("selectedDiscriminators").split(",").filter(value => value !== ""));
          this.cookieService.delete("selectedDiscriminators");
          if (this.selectedDiscriminators.size != this.discriminatorSet.size) {
            this.alleSelected = false;
          }
      }
      else this.selectDiscriminators(["Eingang & Ausgang"]);
    });

    this.mapInteraction.routeEvent.subscribe(bugapoints => {
      console.log(bugapoints);
      bugapoints.forEach((point)=> this.showDiscriminator(point.discriminator));
    })
  }

  /**
   * Method to handle clicks on the chips
   * @param discriminator is the Chip that is currently triggered
   */
  toggleSelection(discriminator: string): void {
    if (this.selectedDiscriminators.has(discriminator)) {
      this.selectedDiscriminators.delete(discriminator);
    } else {
      this.selectedDiscriminators.add(discriminator);
    }
    this.checkAllAndFilter();
  }

  /**
   * Method to filter and emit the bugapoints, according to the selectedDiscriminators.
   */
  filterBugapoints(): void {
    if (this.bugapoints != null && this.discriminatorSet != null) {
      const selectedDiscriminatorsString = Array.from(this.selectedDiscriminators).join(",");
      if (selectedDiscriminatorsString) {
        this.cookieService.set("selectedDiscriminators", selectedDiscriminatorsString);
      }
      // Apply the selected filters to the bugapoints list and emit to parent
      this.filteredBugapointsChange.emit(this.bugapoints
        .filter((bugapoint: Bugapoint) => {
          return this.selectedDiscriminators.has(bugapoint.discriminator);
        }));
    }
  }

  /**
   * Method to manage what happens when the "Alle Auswählen" Chip is triggered.
   */
  alleAuswaehlen() {
    if (this.alleSelected) {
      this.alleSelected = false;
      this.selectedDiscriminators = new Set<string>();
      this.filteredBugapointsChange.emit([]);
      return;
    }
    this.alleSelected = true;
    this.selectedDiscriminators = new Set(this.discriminatorSet);
    this.filterBugapoints();
  }

  /**
   * Method to get the bugapoints from the database.
   */
  updateBugapoints() {
    this.bugapointservice.findAll().subscribe((bugapoints: Bugapoint[]) => {
      this.bugapoints = bugapoints;
      this.checkAllAndFilter();
    });
  }

  /**
   * Method to select all bugapoints in the filter.
   */
  selectAll() {
    this.selectedDiscriminators = new Set(this.discriminatorSet);
    this.checkAllAndFilter();
  }

  /**
   * Method to select one or multiple chips in the filter.
   * @param discriminators Discriminators
   */
  selectDiscriminators(discriminators: string[]) {
    discriminators.forEach((discriminator) => {
      if (!this.discriminatorSet.has(discriminator)) {
        console.warn(this.discriminatorSet + " does not have discriminator " + discriminator);
        return;
      }
    })
    this.selectedDiscriminators = new Set<string>;
    discriminators.forEach((discriminator) => this.selectedDiscriminators.add(discriminator));
    console.log(this.selectedDiscriminators);
    this.checkAllAndFilter();
  }

  /**
   * Method to select no chip in the filter.
   */
  selectNone() {
    this.selectedDiscriminators = new Set(null);
    this.checkAllAndFilter();
  }

  /**
   * Enables the selected discriminator in the filter.
   * @param discriminator
   */
  showDiscriminator(discriminator: string) {
    if (!this.discriminatorSet.has(discriminator)) {
      console.warn(this.discriminatorSet + " does not have discriminator " + discriminator);
      return;
    }
    this.selectedDiscriminators.add(discriminator);
    this.checkAllAndFilter();

  }

  checkAllAndFilter() {
    // Überprüfung ob alle Chips ausgewählt sind
    this.alleSelected = this.selectedDiscriminators.size == this.discriminatorSet.size;

    // Ausführen des Filters
    this.filterBugapoints();
  }
}

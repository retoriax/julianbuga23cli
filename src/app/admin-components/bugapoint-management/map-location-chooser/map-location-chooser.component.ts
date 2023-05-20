import {Component, Input, OnInit} from '@angular/core';
import * as L from "leaflet";
import {ActivatedRoute, Router} from "@angular/router";
import {BugapointService} from "../../../services/bugapoint.service";
import {AdminBugapointService} from "../../../services/admin-services/admin-bugapoint.service";
import {Bugapoint} from "../../../model/bugapoint";
import {lastValueFrom} from "rxjs";
import {FormControl} from "@angular/forms";
import {DatabaseSaveResponse} from "../../../services/DatabaseSaveResponse";
import {MatDialog} from "@angular/material/dialog";
import {diamond} from "ionicons/icons";
import {SavedialogComponent} from "../savedialog/savedialog.component";

@Component({
  selector: 'app-map-location-chooser',
  templateUrl: './map-location-chooser.component.html',
  styleUrls: ['./map-location-chooser.component.css']
})
export class MapLocationChooserComponent implements OnInit{

  map: any;
  newPositionMarker: L.Marker
  newPosition: any;

  @Input()
  point: Bugapoint;

  latForm = new FormControl
  lngForm = new FormControl
  isNewLocationSet = true;

  constructor(private route: ActivatedRoute, private bugapointService: BugapointService,
              private adminBugapointService: AdminBugapointService,
              private router: Router, private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      const points = await lastValueFrom(this.bugapointService.findAll("whereId=" + params['bugaPointId']))
      this.point = points[0]

      this.latForm.setValue(this.point.latitude + '')
      this.lngForm.setValue(this.point.longitude + '')

      this.map = L.map('map');

      L.marker([this.point.latitude, this.point.longitude]).addTo(this.map).bindPopup('Alte Position von '
        + this.point.title)
      this.map.setView([this.point.latitude, this.point.longitude], 16);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom:10,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      this.map.on('click', (e: any) => {

        var coord = this.newPosition = e.latlng;
        this.latForm.setValue(coord.lat + '');
        this.lngForm.setValue(coord.lng + '');

        this.changeNewPositionMarker(coord.lat, coord.lng);

      })
    })
  }


  /**
   * Moves the marker on the map the given position.
   *
   * @param lat Latitude
   * @param lng Longitude
   */
  changeNewPositionMarker(lat: number = this.latForm.value, lng: number = this.lngForm.value) {
    this.isNewLocationSet = false;

    if (this.newPositionMarker != null) {
      this.map.removeLayer(this.newPositionMarker)
    }

    this.newPositionMarker = L.marker([lat, lng]).addTo(this.map).bindPopup('Neue Position von '
      + this.point.title);
  }


  /**
   * Saves the new position of the buga point
   */
  async onSave() {

    let query = `newLat=${this.latForm.value}&newLng=${this.lngForm.value}`

    let response : DatabaseSaveResponse = await this.adminBugapointService.updateBugapoint(this.point, query);

    if (response.success) {
      this.router.navigate(['/admin/bugapoints']).then();
      this.dialog.open(SavedialogComponent, {data:
          {
            message: `Neue Position für ${this.point.title} gespeichert!`
          }
      })
    } else {
      this.dialog.open(SavedialogComponent, {data:
          {
            message: `Ein Fehler ist aufgetreten. Neue Position konnte nicht gespeichert werden.`
          }
      })
    }
  }


  /**
   * Aborts the relocation of the buga point
   */
  onAbort() {
    this.router.navigate(['/admin/bugapoints']).then();
  }

}

import {Component, Input, OnInit} from '@angular/core';
import * as L from "leaflet";
import {ActivatedRoute} from "@angular/router";
import {BugapointService} from "../../../services/bugapoint.service";
import {AdminBugapointService} from "../../../services/admin-services/admin-bugapoint.service";
import {Bugapoint} from "../../../model/bugapoint";
import {lastValueFrom} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-map-location-chooser',
  templateUrl: './map-location-chooser.component.html',
  styleUrls: ['./map-location-chooser.component.css']
})
export class MapLocationChooserComponent implements OnInit{

  map: any;
  newPositionMarker: L.Marker
  newPosition: any;

  point: Bugapoint;

  latForm = new FormControl
  longForm = new FormControl
  isNewLocationSet = true;

  constructor(private route: ActivatedRoute, private bugapointService: BugapointService,
              private adminbugapointService: AdminBugapointService) {
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      const points = await lastValueFrom(this.bugapointService.findAll("whereId=" + params['bugaPointId']))
      this.point = points[0]

      this.latForm.setValue(this.point.latitude + '')
      this.longForm.setValue(this.point.longitude + '')

      console.log(this.point)

      this.map = L.map('map');

      console.log(this.point.latitude)
      L.marker([this.point.latitude, this.point.longitude]).addTo(this.map)
      this.map.setView([this.point.latitude, this.point.longitude], 16);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom:10,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      this.map.on('click', (e: any) => {
        this.isNewLocationSet = false;

        var coord = this.newPosition = e.latlng;
        this.latForm.setValue(coord.lat + '');
        this.longForm.setValue(coord.lng + '');

        if (this.newPositionMarker != null) {
          this.map.removeLayer(this.newPositionMarker)
        }
        this.newPositionMarker = L.marker([coord.lat, coord.lng]).addTo(this.map);

      })
    })
  }

}

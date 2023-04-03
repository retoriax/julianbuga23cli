import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {Bugapoint} from "../model/bugapoint";
import {BugapointServiceService} from "../service/bugapoint-service.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map:any
  bugapoints: Bugapoint[];

  constructor(private bugapointservice: BugapointServiceService) {
  }
  ngOnInit() {
    this.map = L.map('map').setView([49.4793, 8.49589], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom:10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.bugapointservice.getData().subscribe((data: any) => {
        this.bugapoints = data;
        for (const bugapoint of this.bugapoints) {
          this.showMarker(bugapoint.latitude, bugapoint.longitude, bugapoint.title);
        }
      },
      (error: any) => {
        console.error('An error occurred:', error);
        this.map = L.map('map').setView([49.4793, 8.49589], 15);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          minZoom:10,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
      });
  }
  showMarker(latitude: number, longitude: number, title: string) {
    L.marker([longitude, latitude]).addTo(this.map)
      .bindPopup(title).openPopup().addTo(this.map);
  }
}

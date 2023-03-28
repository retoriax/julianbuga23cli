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

    this.bugapointservice.findAll().subscribe((data: Bugapoint[]) => {
      this.bugapoints = data;
    });
    this.bugapointservice.getData().subscribe((data: any) => {
        const latitude = data[0].latitude;
        const longitude = data[0].longitude;
        this.showMarker(latitude, longitude);
      },
      (error: any) => {
        console.error('An error occurred:', error);
        this.map = L.map('map').setView([49.4953024,  8.5220529], 15);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
      });
  }
  showMarker(latitude: number, longitude: number) {
    this.map = L.map('map').setView([longitude, latitude], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    L.marker([longitude, latitude]).addTo(this.map)
      .bindPopup('<b>Entrance 1</b><br />').openPopup().addTo(this.map);
  }
}

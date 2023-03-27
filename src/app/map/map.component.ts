import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {Bugapoint} from "../model/bugapoint";
import {HttpClient} from "@angular/common/http";
import {BugapointListComponent} from "../bugapoint-list/bugapoint-list.component";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;

  markers: Bugapoint[];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.map = L.map('map').setView([49.5001028, 8.5176658], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    L.marker([49.5001028, 8.5176658]).addTo(this.map)
      .bindPopup('<b>You are here</b><br />').openPopup().addTo(this.map);

  }
}


import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {Bugapoint} from "../model/bugapoint";
import {HttpClient} from "@angular/common/http";

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
    this.map = L.map('map').setView([49.483552, 8.496318], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 18,
      id: 'mapbox.streets'
    }).addTo(this.map);
  }
}


import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";

@Component({
  selector: 'app-map-location-chooser',
  templateUrl: './map-location-chooser.component.html',
  styleUrls: ['./map-location-chooser.component.css']
})
export class MapLocationChooserComponent implements OnInit{

  map: any;

  constructor() {
    console.log("HIER HIER")
  }

  ngOnInit(): void {
    this.map = L.map('map');
    this.map.setView([49.48374114628255, 8.494567173596847], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom:10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

}

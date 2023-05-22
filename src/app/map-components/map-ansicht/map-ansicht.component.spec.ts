import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: L.Map;
  selectedAnsichtOption = 'Freie Bewegung';

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map', {
      center: [49.482438, 8.463069],
      zoom: 14
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
  }

  onAnsichtOptionSelected(option: string) {
    this.selectedAnsichtOption = option;
    // Use the selected option to update the map
  }
}

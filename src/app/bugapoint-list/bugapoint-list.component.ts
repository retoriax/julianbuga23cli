import {Component, OnInit} from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {BugapointServiceService} from "../service/bugapoint-service.service";
import * as L from "leaflet";
import {DomUtil} from "leaflet";



@Component({
  selector: 'app-bugapoint-user-list',
  templateUrl: './bugapoint-list.component.html',
  styleUrls: ['./bugapoint-list.component.css']
})
export class BugapointListComponent implements OnInit {
  map:any
  bugapoints: Bugapoint[];


  constructor(private bugapointservice: BugapointServiceService) {

  }

  ngOnInit() {

    this.bugapointservice.findAll().subscribe((data: Bugapoint[]) => {
      this.bugapoints = data;
    });
    this.map = L.map('map').setView([49.1254, 8.5176658], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    L.marker([49.5001028, 8.5176658]).addTo(this.map)
      .bindPopup('<b>You are here</b><br />').openPopup().addTo(this.map);
  }
}

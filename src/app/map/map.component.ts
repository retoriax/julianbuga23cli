import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
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

  p1:Bugapoint;
  p2:Bugapoint;
  p3:Bugapoint;
  points:Bugapoint[];

  constructor(private bugapointservice: BugapointServiceService) {
  }
  ngOnInit() {

    /**
     * Map init at given position and zoom level.
     */
    this.map = L.map('map').setView([49.4793, 8.49589], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom:10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);


    /**
     * Get bugapoints and put them on the map
     */
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




    this.p1 = new Bugapoint();
    this.p1.latitude = 49.48345304381661;
    this.p1.longitude = 8.49525170232847;

    this.p2= new Bugapoint();
    this.p2.latitude = 49.48557417009709;
    this.p2.longitude = 8.490393677754632;

    this.p3 = new Bugapoint();
    this.p3.latitude = 49.48185249642774;
    this.p3.longitude = 8.4991549728166;

    this.points = [this.p2, this.p1];

    this.showRoute(this.points);

  }


  /**
   * Method to add a simple marker to the map.
   *
   * @param latitude Latitude
   * @param longitude Longitude
   * @param title Title
   */
  showMarker(latitude: number, longitude: number, title: string) {
    L.marker([longitude, latitude]).addTo(this.map)
      .bindPopup(title).openPopup().addTo(this.map);
  }

  /**
   * Draws a route on the map between the points.
   *
   * @param points Points
   */
  showRoute(points:Bugapoint[]) {
    const waypoints = points.map(point => {
      return {
        latLng: L.latLng(point.latitude, point.longitude)
      };
    });

    L.Routing.control({
      waypoints: waypoints,
      router: L.Routing.osrmv1({
        serviceUrl: 'http://localhost:5000/route/v1',
        profile: 'foot'
      })
    }).addTo(this.map);
  }
}

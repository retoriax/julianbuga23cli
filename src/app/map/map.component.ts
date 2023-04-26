import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import {Bugapoint} from "../model/bugapoint";
import {MapInteractionService} from "../service/map-interaction.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map:any
  bugapoints: Bugapoint[];
  iconsCache: { [key: string]: L.Icon } = {};
  constructor(private cookieService: CookieService,
              private mapInteractionService: MapInteractionService) {}
  ngOnInit() {
    /**
     * Map init at given position and zoom level.
     */
    this.map = L.map('map').setView([49.495, 8.5], 15);
    const savedView = this.cookieService.get('mapView');
    if (savedView) {
      const { center, zoom } = JSON.parse(savedView);
      this.map.setView(center, zoom);
    }
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom:10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    //saves the current View in Cookie
    this.map.on('moveend', () => this.saveMapView());

    //reloads the Map, if not fully loaded
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 500);

    /**
     * Displayes one point if there are any changes to the displayedBugapointObservable in the mapInteractionService
     */
    this.mapInteractionService.displayedBugapointObservable.subscribe(bugapoint => {
      this.displayPointCentered(bugapoint);
    });
    this.mapInteractionService.hideBugapoint();

    /**
     * Shows the Route if there are any changes to the displayedBugapointObservable in the mapInteractionService
     */
    this.mapInteractionService.routeObservable.subscribe(bugapoints => {
      this.showRoute(bugapoints);
    });
    this.mapInteractionService.clearRoute();
  }

  onFilteredBugapointsChange(filteredBugapoints: Bugapoint[]) {
    this.bugapoints = filteredBugapoints;
    this.updateMarkers();
  }


  /**
   * Method to add a simple marker to the map.
   *
   * @param latitude Latitude
   * @param longitude Longitude
   * @param title Title
   */
  showMarker(latitude: number, longitude: number, title: string, discriminator: string) {
    L.marker([latitude, longitude]).addTo(this.map).bindPopup(title).addTo(this.map).setIcon(this.getIconFromDiscriminator(discriminator))
  }

  /**
   *   Method to update the markers on the map
   */
  updateMarkers() {
    // Remove all existing markers from the map
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    // Add new markers to the map based on the bugapoints data
    for (const bugapoint of this.bugapoints) {
      this.showMarker(bugapoint.latitude, bugapoint.longitude, bugapoint.title, bugapoint.discriminator);
    }
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
      addWaypoints: false,
      plan: L.Routing.plan(waypoints, {draggableWaypoints: false, addWaypoints: false, language: 'de'}),
      router: L.Routing.osrmv1({
        serviceUrl: 'http://localhost:5000/route/v1',
        profile: 'foot',
      })
    }).addTo(this.map);
  }

  /**
   * Method to display one Bugapoint centered.
   * @param bugapoint Point
   */
  displayPointCentered(bugapoint: Bugapoint|null) {
    if(bugapoint !== null) {
      this.map.setView(new L.LatLng(bugapoint.latitude, bugapoint.longitude), 23);
    }
  }

  getIconFromDiscriminator(discriminator: string): L.Icon {
    const iconUrl = `././assets/MapIcons/${discriminator}.png`;
    if (this.iconsCache[iconUrl]) {
      return this.iconsCache[iconUrl];
    } else if (this.fileExists(iconUrl)) {
      const icon = L.icon({
        iconUrl: iconUrl,
        iconSize: [32, 32],
      });
      this.iconsCache[iconUrl] = icon;
      return icon;
    } else {
      console.warn(`Icon file '${iconUrl}' not found. Using default icon.`);
      const defaultIconUrl = '././assets/MapIcons/Default.png';
      const defaultIcon = L.icon({
          iconUrl: defaultIconUrl,
          iconSize: [32, 32],
      });
      this.iconsCache[iconUrl] = defaultIcon;
      return defaultIcon;
    }
  }

  fileExists(url: string): boolean {
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
  }

  saveMapView() {
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();
    this.cookieService.set('mapView', JSON.stringify({ center, zoom }));
  }


}

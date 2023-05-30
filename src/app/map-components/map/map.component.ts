import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import {Bugapoint} from "../../model/bugapoint";
import {CookieService} from "ngx-cookie-service";
import {MapInteractionService} from "../../services/map-interaction.service";
import {IconService} from "../../services/icon.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map:any
  bugapoints: Bugapoint[] = [];
  routepoints: Bugapoint[] | null;
  selectedAnsichtOption: string;


  markerBackground : string = "Blue";
  markerActiveBackground: string = "Green";
  markerRouteBackground: string = "Red";

  constructor(private cookieService: CookieService,
              private mapInteractionService: MapInteractionService,
              private iconService: IconService) {}
  ngOnInit() {
    /**
     * Map init at given position and zoom level.
     */
    this.map = L.map('map');
    if (this.cookieService.check('mapView')) {
      const savedView = this.cookieService.get('mapView');
      const { center, zoom } = JSON.parse(savedView);
      this.map.setView(center, zoom);
      } else this.map.setView([49.482334946560044, 8.497849729196929], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom:10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    this.onAnsichtOptionSelected('Luisenpark');
    this.map.attributionControl.remove();

    /**
     * Saves the current map view.
     */
    this.map.on('moveend', () => this.saveMapView());

    /**
     * Resizes the map after 500ms of showing the map.
     * Needed to fix the map not loading bug.
     */
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 500);

    /**
     * Displayes one point if there are any changes to the displayedBugapointObservable in the mapInteractionService
     */
    this.mapInteractionService.displayedBugapointObservable.subscribe(bugapoint => {
      this.displayPointCentered(bugapoint, 23);
    });
    this.mapInteractionService.hideBugapoint();

    /**
     * Shows the Route if there are any changes to the displayedBugapointObservable in the mapInteractionService
     */
    this.mapInteractionService.routeObservable.subscribe(bugapoints => {
      if (bugapoints.length == 0) return;
      this.cookieService.set("currentRoute", JSON.stringify(bugapoints));
      this.displayPointCentered(bugapoints[0], 18);
      this.showRoute(bugapoints);
    });
  }

  /**
   * Method to receive the currently selected bugapoints from the filter.
   * @param filteredBugapoints, the array of the currently selected bugapoints.
   */
  onFilteredBugapointsChange(filteredBugapoints: Bugapoint[]) {
    this.bugapoints = filteredBugapoints;
    this.updateMarkers();
  }

  /**
   * Method to add a simple marker to the map.
   *
   * @param bugapoint Bugapoint
   * @param background
   */
  async showMarker(bugapoint: Bugapoint, background: string) {
    const marker = L.marker([bugapoint.latitude, bugapoint.longitude]).addTo(this.map).bindPopup(this.getPopup(bugapoint)).setIcon(await this.iconService.getIcon(bugapoint.iconname, background));
    this.addPopupEvent(marker, bugapoint);
  }

  /**
   *   Method to update the markers on the map.
   */
  updateMarkers() {
    // Remove all existing markers from the map
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Filter bugapoints based on the selected park option
    let filteredBugapoints: Bugapoint[];
    if (this.selectedAnsichtOption === 'Luisenpark') {
      filteredBugapoints = this.bugapoints.filter((bugapoint) => bugapoint.parkID === 1);
    } else if (this.selectedAnsichtOption === 'Spinellipark') {
      filteredBugapoints = this.bugapoints.filter((bugapoint) => bugapoint.parkID === 2);
    } else {
      filteredBugapoints = this.bugapoints;
    }

    // Add new markers to the map based on the filtered bugapoints
    filteredBugapoints.forEach((point) => {
      this.showMarker(point);
    // Add new markers to the map based on the bugapoints data
    this.bugapoints.forEach((point) => {
      this.showMarker(point, this.markerBackground).then(() => {});
    });

    // Show the route markers
    this.routepoints?.forEach((point) => {
      this.showMarker(point, this.markerRouteBackground).then(() => {});
    });
  }


  /**
   * This method is called when a new option is selected from the view options.
   * It takes a string parameter selectedOption that represents the selected option.
   * Based on the selected option, this method sets the view of the map to a specific location.
   *
   * @param selectedOption a string representing the selected option from the view options
   */
  onAnsichtOptionSelected(selectedOption: string) {
    this.selectedAnsichtOption = selectedOption;

    // Update the markers based on the selected park option
    this.updateMarkers();

    // Hide the current bugapoint
    this.mapInteractionService.hideBugapoint();
    switch (selectedOption) {
      case 'Freie Bewegung':
        const freemovementBounds = L.latLngBounds(
          [49.562104830601314, 8.36095242436513],
          [49.40726086087864, 8.619292747892453]
        );
        this.map.setMaxBounds(freemovementBounds);
        this.map.setMinZoom(13);
        break;
      case 'Luisenpark':
        const luisenparkBounds = L.latLngBounds(
          [49.47513192672553, 8.482767282123094],
          [49.492965547797894, 8.506547916954819]
        );
        this.map.setMaxBounds(luisenparkBounds);
        this.map.setMinZoom(15);
        this.map.setView([49.483698361001274, 8.494909619970286], 15, {animate: true});
        break;
      case 'Spinellipark':
        const spinelliparkBounds = L.latLngBounds(
          [49.507839038133326, 8.506913315977895],
          [49.4904377789783, 8.539246483439282]
        );
        this.map.setMaxBounds(spinelliparkBounds);
        this.map.setMinZoom(14);
        this.map.setView([49.49929999974953, 8.522955113590827], 15, {animate: true});
        break;
      default:
        break;
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
    this.routepoints = points;
    points.forEach((point) => {
      this.showMarker(point, this.markerRouteBackground).then(() => {});
    })


    L.Routing.control({
      addWaypoints: false,
      plan: L.Routing.plan(waypoints, {draggableWaypoints: false, addWaypoints: false, language: 'de'}),
      router: L.Routing.osrmv1({
        serviceUrl: 'https://hjetter.ddns.net/osrm/route/v1',
        profile: 'foot',
      })
    }).addTo(this.map);
  }

  /**
   *
   * @param bugapoint
   * @param zoom
   */
  displayPointCentered(bugapoint: Bugapoint|null|undefined, zoom: number) {
    if(bugapoint !== null && bugapoint !== undefined) {
      this.map.setView(new L.LatLng(bugapoint.latitude, bugapoint.longitude), zoom);
    }
  }

  /**
   * Method to save the current view of the map to the browser cookies.
   */
  saveMapView() {
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();
    this.cookieService.set('mapView', JSON.stringify({ center, zoom }));
  }

  getPopup(bugapoint: Bugapoint) : string {
    // Define the HTML content for the popup
    const hasDescription = !!bugapoint.description; // Check if description is truthy (not empty or null)
    const additionalInfoButton = hasDescription ? `<button id="toggle-info-${bugapoint.latitude}-${bugapoint.longitude}" class="popup-toggle-btn btn btn-primary btn-sm" style="font-size: 12px; border-radius: 20px; background-color: white; color: #007bff; border-color: #007bff; margin-left: 10px;"><i class="fa fa-plus" style="color: #007bff;"></i> Mehr Details anzeigen</button>` : '';
    return `
    <div style="font-size: 16px;"><b>${bugapoint.title}</b></div> <!-- Title of the popup -->
    <div id="additional-info-${bugapoint.latitude}-${bugapoint.longitude}" style="display:none; margin-top: 10px; font-size: 14px;">${bugapoint.description}</div> <!-- Additional information that can be toggled to display or hide -->
    <div style="margin-top: 10px;">
      <button id="button-${bugapoint.id}" class="popup-add-to-route-btn btn btn-primary btn-sm" style="font-size: 12px; border-radius: 20px; background-color: #007bff; color: white;"><i class="fa fa-plus"></i> Zur Route hinzufügen</button> <!-- Button to add the location to a route -->
      ${additionalInfoButton}
    </div>
  `;
  }

  addPopupEvent(marker: L.Marker, bugapoint: Bugapoint) {
    // When the popup is opened, add an event listener to the toggle button to show/hide the additional information
    marker.on('popupopen', async (a) => {
      marker.setIcon(await this.iconService.getIcon(bugapoint.iconname, this.markerActiveBackground));
      const toggleButton = document.getElementById(`toggle-info-${bugapoint.latitude}-${bugapoint.longitude}`);
      const additionalInfoContainer = document.getElementById(`additional-info-${bugapoint.latitude}-${bugapoint.longitude}`);
      a.target.getPopup().getElement().querySelector("#button-"+bugapoint.id).addEventListener("click", () => {this.mapInteractionService.addPointToRoute(bugapoint)})
      if (toggleButton && additionalInfoContainer) {
        toggleButton.onclick = (event) => {
          event.preventDefault(); // prevent default behavior of anchor tag
          if (additionalInfoContainer.style.display === 'none') {
            additionalInfoContainer.style.display = 'block'; // show additional information
            toggleButton.innerHTML = '<i class="fa fa-minus" style="color: #007bff;"></i> Details ausblenden'; // change the label of the toggle button to indicate that the information can be hidden
          } else {
            additionalInfoContainer.style.display = 'none'; // hide additional information
            toggleButton.innerHTML = '<i class="fa fa-plus" style="color: #007bff;"></i> Mehr Details anzeigen'; // change the label of the toggle button to indicate that the information can be displayed
          }
        };
      }
    });
    marker.on('popupclose',   async () => {
      let set = false;
      await Promise.all(
        (this.routepoints ?? [])
          .filter(point => point === bugapoint)
          .map(async (point) => {
            set = true;
            await marker.setIcon(await this.iconService.getIcon(bugapoint.iconname, this.markerRouteBackground));
          })
      ).then(async () => {
        if (!set) marker.setIcon(await this.iconService.getIcon(bugapoint.iconname, this.markerBackground));
      });
    });
  }
}

import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Bugapoint} from "../../../model/bugapoint";
import {FormControl} from "@angular/forms";
import {AdminService} from "../../../services/admin.service";
import {BugapointService} from "../../../services/bugapoint.service";
import {DatabaseSaveResponse} from "../../../services/DatabaseSaveResponse";
import {AdminBugapointService} from "../../../services/admin-services/admin-bugapoint.service";
import {ActivatedRoute, Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {Admin} from "../../../model/admin";
import * as L from "leaflet";

@Component({
  selector: 'app-admin-components-bugapointpanel',
  templateUrl: './bugapointpanel.component.html',
  styleUrls: ['./bugapointpanel.component.css']
})
export class BugapointpanelComponent implements OnInit {

  constructor(private adminService: AdminService,
              private bugapointService: BugapointService,
              private elementRef: ElementRef, private renderer: Renderer2,
              private adminBugapointService: AdminBugapointService,
              private router: Router,
              private route: ActivatedRoute) {
  }


  point: Bugapoint
  oldPosition: number[]
  admins: Admin[]

  map: any
  newPositionMarker: L.Marker
  newPosition: any;

  title: string

  adminForm = new FormControl
  latForm = new FormControl
  lngForm = new FormControl
  descriptionForm = new FormControl

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async (params) => {
      const points = await lastValueFrom(this.bugapointService.findAll("whereId=" + params['bugaPointId']))
      this.point = points[0]
      this.oldPosition = [this.point.latitude, this.point.longitude]

      this.title = this.point.title


      await this.adminService.findAll().subscribe((data: Admin[]) => {
        this.admins = data;
        let pointAdmin : Admin | undefined = this.admins.find((a => a.id == this.point.adminID))
        // @ts-ignore
        this.adminForm.setValue(pointAdmin?.emailadress)
      })

      this.descriptionForm.setValue(this.point.description)

      this.latForm.setValue(this.point.latitude + '')
      this.lngForm.setValue(this.point.longitude + '')


      this.map = L.map('map');

      L.marker([this.point.latitude, this.point.longitude]).addTo(this.map).bindPopup('Alte Position von '
        + this.point.title)
      this.map.setView([this.point.latitude, this.point.longitude], 16);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom:10,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      this.map.on('click', (e: any) => {

        var coord = this.newPosition = e.latlng;
        this.latForm.setValue(coord.lat + '');
        this.lngForm.setValue(coord.lng + '');

        this.changeNewPositionMarker(coord.lat, coord.lng);

      })


    })
  }

  /**
   * Updates the bugapoint with the values in the form controls
   */
  async update() {
    const elem = this.elementRef.nativeElement.querySelector("mat-expansion-panel");

    try {
      let query = `newLat=${this.latForm.value}&newLng=${this.lngForm.value}
        &newDescription=${this.descriptionForm.value}&newAdminEmailaddress=${this.adminForm.value}`

      const bugaPointResponse: DatabaseSaveResponse = await this.adminBugapointService.updateBugapoint(
        this.point,
        query
      );

      if (bugaPointResponse.success) {
        this.renderer.addClass(elem, "success-animation");
      } else {
        this.renderer.addClass(elem, "fail-animation");
      }
    } catch (error) {
      this.renderer.addClass(elem, "fail-animation");
    }
  }


  /**
   * Deletes this bugapoint.
   */
  async delete() {
    await this.adminBugapointService.deleteBugapointById(this.point.id);
  }


  /**
   * Moves the marker on the map the given position.
   *
   * @param lat Latitude
   * @param lng Longitude
   */
  changeNewPositionMarker(lat: number = this.latForm.value, lng: number = this.lngForm.value) {
    if (this.newPositionMarker != null) {
      this.map.removeLayer(this.newPositionMarker)
    }

    this.newPositionMarker = L.marker([lat, lng]).addTo(this.map).bindPopup('Neue Position von '
      + this.point.title);
  }


  /**
   * Sets the position of the position marker to the user location. Also updates the input fields
   */
  useUserPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latForm.setValue(position.coords.latitude + '');
        this.lngForm.setValue(position.coords.longitude + '');

        this.changeNewPositionMarker(position.coords.latitude, position.coords.longitude)
      })
    }


  }

  /**
   * Sets the inputs and the marker to database version.
   * Also deletes the new position marker.
   */
  resetPointPosition() {
    this.latForm.setValue(this.oldPosition[0]);
    this.lngForm.setValue(this.oldPosition[1]);

    if (this.newPositionMarker != null) {
      this.map.removeLayer(this.newPositionMarker)
    }
  }
}

import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
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
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {LatLng} from "leaflet";

@Component({
  selector: 'app-admin-components-bugapointpanel',
  templateUrl: './bugapointpanel.component.html',
  styleUrls: ['./bugapointpanel.component.css']
})
export class BugapointpanelComponent implements OnInit {

  constructor(private adminService: AdminService, private bugapointService: BugapointService, private router: Router,
              private elementRef: ElementRef, private renderer: Renderer2, private route: ActivatedRoute,
              private adminBugapointService: AdminBugapointService, private snackBar: MatSnackBar) {
  }

  //Update - new diffs
  mode: string
  buttonText: string

  //Variables
  point: Bugapoint
  admins: Admin[]
  discriminators = new Set<string>;

  //Map stuff
  map: any
  newPointLatLng: L.LatLng = new LatLng(49.48648544355771, 8.501050886466462)
  flexMarker: L.Marker
  newPosition: any;
  oldLatLng: L.LatLng

  title: string

  //Form controls
  titleForm = new FormControl
  adminForm = new FormControl
  latForm = new FormControl
  lngForm = new FormControl
  descriptionForm = new FormControl('')
  discriminatorForm = new FormControl;

  async ngOnInit(): Promise<void> {
    //Set mode by url
    switch (this.route.snapshot.url[this.route.snapshot.url.length - 1].path) {
      case "edit": {
        this.mode = "update";
        this.buttonText = "Speichern";
        break;
      }

      case "new": {
        this.mode = "new";
        this.title = "Neuer Bugapoint";
        this.buttonText = "Erstellen";
        break;
      }
    }

    //Setup Map
    this.map = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    this.map.on('click', (e: any) => {
      var coord = this.newPosition = e.latlng;
      this.latForm.setValue(coord.lat);
      this.lngForm.setValue(coord.lng);

      this.changeNewPositionMarker(coord.lat, coord.lng);
    })


    //Load data (discriminators and admins for drop down panels)
    await this.bugapointService.getDiscriminators().subscribe((data: any) => {
      this.discriminators = data;
    })

    await this.adminService.findAll().subscribe((data: Admin[]) => {
      this.admins = data;
    })

    switch (this.mode) {
      case "update": { //Update setup
        this.route.queryParams.subscribe(async (params) => {
          const points = await lastValueFrom(this.bugapointService.findAll("whereId=" + params['bugaPointId']))
          this.point = points[0]
          this.oldLatLng = new LatLng(this.point.latitude, this.point.longitude)

          this.title = this.point.title

          await this.adminService.findAll().subscribe((data: Admin[]) => {
            this.admins = data;
            this.adminForm.setValue(this.admins.find(a => a.id == this.point.adminID)?.emailadress);
          })
          this.discriminatorForm.setValue(this.point.discriminator)
          this.descriptionForm.setValue(this.point.description)
          this.latForm.setValue(this.point.latitude + '')
          this.lngForm.setValue(this.point.longitude + '')

          L.marker([this.point.latitude, this.point.longitude]).addTo(this.map).bindPopup('Alte Position von '
            + this.point.title)
          this.map.setView([this.point.latitude, this.point.longitude], 16);
        })
        break;
      }

      case "new": { //New point setup
        this.oldLatLng = this.newPointLatLng;
        this.flexMarker = L.marker(this.newPointLatLng).addTo(this.map).bindPopup("")
        this.map.setView(this.newPointLatLng, 16);



        this.latForm.setValue(this.newPointLatLng.lat);
        this.lngForm.setValue(this.newPointLatLng.lng);
      }
    }
  }


  /**
   * Updates the bugapoint with the values in the form controls
   */
  async save() {
    switch (this.mode) {
      case "update": {
        let sbConfig = new MatSnackBarConfig();
        sbConfig.duration = 1000;
        sbConfig.verticalPosition = "top";
        sbConfig.horizontalPosition = "center"

        try {
          let query =
            `newLat=${this.latForm.value}
            &newLng=${this.lngForm.value}
            &newDescription=${this.descriptionForm.value}
            &newAdminEmailaddress=${this.adminForm.value}
            &newDiscriminator=${this.discriminatorForm.value}`

          const bugaPointResponse: DatabaseSaveResponse = await this.adminBugapointService.updateBugapoint(
            this.point,
            query
          );

          if (bugaPointResponse.success) {
            this.snackBar.open("Gespeichert", "", sbConfig)
          } else {
            this.snackBar.open("Nicht gespeichert", "", sbConfig)
          }

          await this.router.navigate(['admin/bugapoints'])

        } catch (error) {
          this.snackBar.open("Nicht gespeichert", "", sbConfig)
        }
        break;
      }
      case "new": {
        let saveBugapoint: Bugapoint = new Bugapoint(this.latForm.value, this.lngForm.value);
        saveBugapoint.title = this.titleForm.value;
        saveBugapoint.adminID = this.admins.find(a => a.emailadress == this.adminForm.value)?.id;
        saveBugapoint.description = this.descriptionForm.value;
        saveBugapoint.discriminator = this.discriminatorForm.value;

        console.log(saveBugapoint)

        break;
      }
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
    if (this.flexMarker != null) {
      this.map.removeLayer(this.flexMarker)
    }

    switch (this.mode) {
      case "update": {
        this.flexMarker = L.marker([lat, lng]).addTo(this.map).bindPopup('Neue Position von '
          + this.point.title);
        break;
      }
      case "new": {
        this.flexMarker = L.marker([lat, lng]).addTo(this.map).bindPopup(this.titleForm.value);
        break;
      }
    }

  }


  /**
   * Sets the position of the position marker to the user location. Also updates the input fields
   */
  useUserPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latForm.setValue(position.coords.latitude);
        this.lngForm.setValue(position.coords.longitude);

        this.changeNewPositionMarker(position.coords.latitude, position.coords.longitude)
      })
    }
  }

  /**
   * Sets the inputs and the marker to database version.
   * Also deletes the new position marker.
   */
  resetPointPosition() {
    if (this.flexMarker != null) {
      this.map.removeLayer(this.flexMarker)
    }

    this.latForm.setValue(this.oldLatLng.lat);
    this.lngForm.setValue(this.oldLatLng.lng);

    if (this.mode == 'new') {
      this.changeNewPositionMarker()
    }
  }
}

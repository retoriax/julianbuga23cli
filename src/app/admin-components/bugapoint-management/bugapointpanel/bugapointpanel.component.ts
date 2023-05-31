import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Bugapoint} from "../../../model/bugapoint";
import {FormControl, Validators} from "@angular/forms";
import {BugapointService} from "../../../services/bugapoint.service";
import {DatabaseSaveResponse} from "../../../services/Responses/DatabaseSaveResponse";
import {AdminBugapointService} from "../../../services/admin-services/admin-bugapoint.service";
import {ActivatedRoute, Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {Admin} from "../../../model/admin";
import * as L from "leaflet";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {LatLng, Util} from "leaflet";
import trim = Util.trim;
import {AdminAdminService} from "../../../services/admin-services/admin-admin.service";
import {IconService} from "../../../services/icon.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

//TODO: env vars
@Component({
  selector: 'app-admin-components-bugapointpanel',
  templateUrl: './bugapointpanel.component.html',
  styleUrls: ['./bugapointpanel.component.css']
})
export class BugapointpanelComponent implements OnInit {

  constructor(private adminService: AdminAdminService, private bugapointService: BugapointService, private router: Router,
              private elementRef: ElementRef, private renderer: Renderer2, private route: ActivatedRoute,
              private adminBugapointService: AdminBugapointService, private snackBar: MatSnackBar,
              private iconService: IconService, private dialog: MatDialog) {
  }

  //Update - new diffs
  mode: string
  buttonText: string

  //Variables
  point: Bugapoint
  admins: Admin[]
  iconnames: string[]
  discriminators = new Set<string>;

  //Map stuff
  map: any
  newPointLatLng: L.LatLng = new LatLng(49.48648544355771, 8.501050886466462)
  flexMarker: L.Marker
  newPosition: any;
  oldLatLng: L.LatLng

  title: string

  //Form controls
  titleForm = new FormControl('', [Validators.required])
  adminForm = new FormControl('', [Validators.required])
  latForm = new FormControl
  lngForm = new FormControl
  descriptionForm = new FormControl('')
  discriminatorForm = new FormControl('', [Validators.required]);
  iconnameForm = new FormControl('', [Validators.required]);

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

    const freemovementBounds = L.latLngBounds(
      [49.562104830601314, 8.36095242436513],
      [49.40726086087864, 8.619292747892453]
    );
    this.map.setMaxBounds(freemovementBounds);
    this.map.setMinZoom(13);

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

    this.iconnames = await this.adminBugapointService.getIconnames()

    switch (this.mode) {
      case "update": { //Update setup
        this.route.queryParams.subscribe(async (params) => {
          const points = await lastValueFrom(this.bugapointService.findAll("whereId=" + params['bugaPointId']))
          this.point = points[0]
          this.oldLatLng = new LatLng(this.point.latitude, this.point.longitude)

          this.title = this.point.title

          await this.adminService.findAll().subscribe((data: Admin[]) => {
            this.admins = data;
            this.adminForm.setValue(this.admins.find(a => a.id == this.point.adminID)?.emailadress + '');
          })
          this.discriminatorForm.setValue(this.point.discriminator)
          this.descriptionForm.setValue(this.point.description)
          this.latForm.setValue(this.point.latitude + '')
          this.lngForm.setValue(this.point.longitude + '')
          this.iconnameForm.setValue(this.point.iconname)

          L.marker([this.point.latitude, this.point.longitude]).addTo(this.map).bindPopup('Alte Position von '
            + this.point.title).setIcon(await this.iconService.getIcon(this.iconnameForm.value + "", "Blue"));
          this.map.setView([this.point.latitude, this.point.longitude], 16);
        })
        break;
      }

      case "new": { //New point setup
        this.oldLatLng = this.newPointLatLng;
        this.flexMarker = L.marker(this.newPointLatLng).addTo(this.map).bindPopup("").setIcon(await this.iconService.getIcon('', "Blue"))

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

    let sbConfig = new MatSnackBarConfig();
    sbConfig.duration = 1000;
    sbConfig.verticalPosition = "top";
    sbConfig.horizontalPosition = "center"

    switch (this.mode) {
      case "update": {
        try {
          let updatedPoint = new Bugapoint(this.latForm.value, this.lngForm.value)
          updatedPoint.description = this.descriptionForm.value;
          updatedPoint.discriminator = this.discriminatorForm.value + '';
          const admin$ = this.admins.find(a => a.emailadress == this.adminForm.value);

          if (admin$ != null) {
            updatedPoint.adminID = admin$.id;
          } else {
            updatedPoint.adminID = 0;
          }

          const bugaPointResponse: DatabaseSaveResponse = await this.adminBugapointService.updateBugapoint(
            this.point,
            updatedPoint
          );

          if (bugaPointResponse.success) {
            if (bugaPointResponse.failed?.length == 0) {
              this.snackBar.open("Gespeichert", "", sbConfig)
              await this.router.navigate(['admin/bugapoints'])
            } else {
              sbConfig.duration = -1;
              this.snackBar.open(bugaPointResponse.failed?.join(', ') + " nicht gespeichert", "Ok", sbConfig);
              await this.router.navigate(['admin/bugapoints'])
            }
          } else {
            this.snackBar.open("Fehler: " + bugaPointResponse.message, "", sbConfig)
            await this.router.navigate(['admin/bugapoints'])
          }

        } catch (error) {
          this.snackBar.open("Nicht gespeichert", "", sbConfig)
        }
        break;
      }
      case "new": {
        let saveBugapoint: Bugapoint = new Bugapoint(this.latForm.value, this.lngForm.value);
        saveBugapoint.title = trim(this.titleForm.value + '');
        saveBugapoint.adminID = this.admins.find(a => a.emailadress == this.adminForm.value)?.id;
        if (this.descriptionForm.value != null) {
          saveBugapoint.description = trim(this.descriptionForm.value);
        }
        saveBugapoint.discriminator = trim(this.discriminatorForm.value + '');
        saveBugapoint.iconname = saveBugapoint.discriminator;

        const bugaPointResponse: DatabaseSaveResponse = await this.adminBugapointService.saveBugapoint(saveBugapoint);

        if (bugaPointResponse.success) {
          this.snackBar.open("Gespeichert", "", sbConfig)
          await this.router.navigate(['admin/bugapoints'])
        } else {
          sbConfig.duration = -1;
          this.snackBar.open("Fehler: " + bugaPointResponse.message, "Ok", sbConfig)

          if (bugaPointResponse.message == 'Sent values are faulty.') {

          }
        }
        break;
      }

    }
    this.bugapointService.forceReload();
  }


  /**
   * Deletes this bugapoint.
   */
  async delete() {
    let sbConfig = new MatSnackBarConfig();
    sbConfig.duration = 1000;
    sbConfig.verticalPosition = "top";
    sbConfig.horizontalPosition = "center"

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {bugapoint: this.point},
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.adminBugapointService.deleteBugapointById(this.point.id);
        await this.router.navigate(['admin/bugapoints'])
        this.bugapointService.forceReload();

        this.snackBar.open(this.point.title + " wurde gelöscht.", "", sbConfig)
      } else {
        this.snackBar.open(this.point.title + " wurde nicht gelöscht.", "", sbConfig)
      }
    })






  }


  /**
   * Moves the marker on the map the given position.
   *
   * @param lat Latitude
   * @param lng Longitude
   */
  async changeNewPositionMarker(lat: number = this.latForm.value, lng: number = this.lngForm.value) {
    if (this.flexMarker != null) {
      this.map.removeLayer(this.flexMarker)
    }

    switch (this.mode) {
      case "update": {
        this.flexMarker = L.marker([lat, lng]).addTo(this.map).bindPopup('Neue Position von '
          + this.point.title).setIcon(await this.iconService.getIcon(this.iconnameForm.value + '', "Yellow"));
        break;
      }
      case "new": {
        this.flexMarker = L.marker([lat, lng]).addTo(this.map).bindPopup(this.titleForm.value + '')
          .setIcon(await this.iconService.getIcon(this.iconnameForm.value + '', "Yellow"));
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

        this.changeNewPositionMarker(position.coords.latitude, position.coords.longitude).then()
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
      this.changeNewPositionMarker().then()
    }
  }
}

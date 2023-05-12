import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AdminService} from "../../../services/admin.service";
import {BugapointService} from "../../../services/bugapoint.service";
import {Bugapoint} from "../../../model/bugapoint";
import {Admin} from "../../../model/admin";
import {Park} from "../../../model/park";
import {ParkService} from "../../../services/park.service";
import {AdminBugapointService} from "../../../services/admin-services/admin-bugapoint.service";
import {MatDialog} from "@angular/material/dialog";
import {SavedialogComponent} from "../savedialog/savedialog.component";
import {DatabaseSaveResponse} from "../../../services/DatabaseSaveResponse";

@Component({
  selector: 'app-admin-components-newpointpanel',
  templateUrl: './newpointpanel.component.html',
  styleUrls: ['./newpointpanel.component.css']
})
export class NewpointpanelComponent implements OnInit {

  admins: Admin[]
  discriminators = new Set<string>;

  parks: Park[]

  formular = new FormGroup({
    title: new FormControl(''),
    type: new FormControl(''),
    description: new FormControl(''),
    park: new FormControl(''),
    longitude: new FormControl(''),
    latitude: new FormControl(''),
    admin: new FormControl('')
  })



  constructor(private adminService: AdminService, private bugapointService: BugapointService,
              private parkService: ParkService, private adminBugapointService: AdminBugapointService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    //Load admins from database
    this.adminService.findAll().subscribe((data: Admin[]) => {
      this.admins = data;
    })

    //Load bugapoints from database
    this.bugapointService.getDiscriminators().subscribe((data: any) => {
      this.discriminators = data;
    })

    //Load parks from databse
    this.parkService.findAll().subscribe((data: Park[]) => {
      this.parks = data;
      console.log(this.parks)
    })
  }

  /**
   * Fills the present user location in the input fields.
   */
  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.formular.get('latitude')?.setValue(position.coords.latitude + '');
        this.formular.get('longitude')?.setValue(position.coords.longitude + '');
      })
    }
  }

  /**
   * Saves the inputs as a bugapoint.
   */
  async saveBugapoint() {
    let bugaPoint = new Bugapoint(Number(this.formular.get('latitude')?.value), Number(this.formular.get('longitude')?.value));

    bugaPoint.adminID = 0;
    bugaPoint.parkID = 0;

    try {
      const foundAdmin = this.admins.find(pAdmin => pAdmin.emailadress == this.formular.get('admin')?.value)
      // @ts-ignore
      bugaPoint.adminID = Number(foundAdmin.id);

      const foundPark = this.parks.find(pPark => pPark.title == this.formular.get('park')?.value)
      // @ts-ignore
      bugaPoint.parkID = parseInt(foundPark.id);
      console.log('parkId: ' + bugaPoint.parkID)
    } catch (e) {

    }

    bugaPoint.description = String(this.formular.get('description')?.value);
    bugaPoint.discriminator = String(this.formular.get('type')?.value);
    bugaPoint.latitude = Number(this.formular.get('latitude')?.value);
    bugaPoint.longitude = Number(this.formular.get('longitude')?.value);
    bugaPoint.title = String(this.formular.get('title')?.value);

    const response: DatabaseSaveResponse = await this.adminBugapointService.saveBugapoint(bugaPoint);


    if (response.success) {
      this.dialog.open(SavedialogComponent, {data:
          {
            message: 'Gespeichert!'
          }
      })

      this.clearForms()
    } else {
      this.dialog.open(SavedialogComponent, {data:
          {
            message: 'Neuer Punkt konnte nicht gespeichert werden.'
          }
      })
    }

  }

  clearForms() {
    this.formular.get('title')?.setValue('')
    this.formular.get('type')?.setValue('')
    this.formular.get('description')?.setValue('')
    this.formular.get('park')?.setValue('')
    this.formular.get('latitude')?.setValue('')
    this.formular.get('longitude')?.setValue('')
    this.formular.get('admin')?.setValue('')
  }

}

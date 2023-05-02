import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {BugapointService} from "../../services/bugapoint.service";
import {Bugapoint} from "../../model/bugapoint";
import {Admin} from "../../model/admin";
import {Park} from "../../model/park";
import {ParkService} from "../../services/park.service";
import {AdminBugapointService} from "../../services/admin-services/admin-bugapoint.service";

@Component({
  selector: 'app-admin-components-newpointpanel',
  templateUrl: './adminpanel-newpointpanel.component.html',
  styleUrls: ['./adminpanel-newpointpanel.component.css']
})
export class AdminpanelNewpointpanelComponent implements OnInit {

  admins: Admin[]
  discriminators = new Set<string>;

  parks: Park[]

  pTitle = new FormControl('');
  type = new FormControl('');
  description = new FormControl('');
  park = new FormControl('');
  longitude = new FormControl('');
  latitude = new FormControl('');
  admin = new FormControl('');


  constructor(private adminService: AdminService, private bugapointService: BugapointService,
              private parkService: ParkService, private adminBugapointService: AdminBugapointService) {
  }

  ngOnInit(): void {
    //Load admins from database
    this.adminService.findAll().subscribe((data: Admin[]) => {
      console.log(data)
      this.admins = data;
    })

    //Load bugapoints from database
    this.bugapointService.getDiscriminators().subscribe((data: any) => {
      console.log(data)
      this.discriminators = data;
    })

    //Load parks from databse
    this.parkService.findAll().subscribe((data: Park[]) => {
      console.log(data)
      this.parks = data;
    })
  }

  /**
   * Fills the present user location in the input fields.
   */
  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude.setValue(position.coords.latitude + '');
        this.longitude.setValue(position.coords.longitude + '');
      })
    }
  }

  /**
   * Saves the inputs as a bugapoint.
   */
  saveBugapoint() {

    let bugaPoint = new Bugapoint(Number(this.latitude.value), Number(this.longitude.value));

    const foundAdmin = this.admins.find(pAdmin => pAdmin.emailadress == this.admin.value)
    // @ts-ignore
    bugaPoint.adminID = Number(foundAdmin.id);

    const foundPark = this.parks.find(pPark => pPark.title == this.park.value)
    // @ts-ignore
    bugaPoint.parkID = Number(foundPark.id);

    bugaPoint.description = String(this.description.value);
    bugaPoint.discriminator = String(this.type.value);
    bugaPoint.latitude = Number(this.latitude.value);
    bugaPoint.longitude = Number(this.longitude.value);
    bugaPoint.title = String(this.pTitle.value);

    console.log(bugaPoint)

    this.adminBugapointService.saveBugapoint(bugaPoint);
    /*this.bugapointService.addBugapoint(bugaPoint.parkID, bugaPoint.adminID, bugaPoint.title, bugaPoint.latitude,
      bugaPoint.longitude, bugaPoint.discriminator, bugaPoint.description);*/
  }



}

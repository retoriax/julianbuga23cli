import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {BugapointService} from "../../services/bugapoint.service";
import {Bugapoint} from "../../model/bugapoint";
import {Admin} from "../../model/admin";

@Component({
  selector: 'app-admin-components-newpointpanel',
  templateUrl: './adminpanel-newpointpanel.component.html',
  styleUrls: ['./adminpanel-newpointpanel.component.css']
})
export class AdminpanelNewpointpanelComponent implements OnInit {

  admins: Admin[]
  discriminators = new Set<string>

  pTitle = new FormControl('');
  type = new FormControl('');
  description = new FormControl('');
  longitude = new FormControl('');
  latitude = new FormControl('');
  admin = new FormControl('');


  constructor(private adminService: AdminService, private bugapointService: BugapointService) {
  }

  ngOnInit(): void {
    this.adminService.getAdmins().subscribe((data: Admin[]) => {
      console.log(data)
      this.admins = data;
    })

    this.bugapointService.getDiscriminators().subscribe((data: any) => {
      console.log(data)
      this.discriminators = data;
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

    bugaPoint.title = String(this.pTitle.value);
    bugaPoint.adminId = Number(this.admin.value);
    bugaPoint.discriminator = String(this.type.value);


    this.bugapointService.saveBugapoint(bugaPoint)
  }

}

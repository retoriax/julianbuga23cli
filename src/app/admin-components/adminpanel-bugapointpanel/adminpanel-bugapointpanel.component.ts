import {Component, Input, OnInit} from '@angular/core';
import {Bugapoint} from "../../model/bugapoint";
import {FormControl} from "@angular/forms";
import {Admin} from "../../model/admin";
import {AdminService} from "../../services/admin.service";
import {BugapointService} from "../../services/bugapoint.service";
import {point} from "leaflet";

@Component({
  selector: 'app-admin-components-bugapointpanel',
  templateUrl: './adminpanel-bugapointpanel.component.html',
  styleUrls: ['./adminpanel-bugapointpanel.component.css']
})
export class AdminpanelBugapointpanelComponent implements OnInit {

  constructor(private adminService: AdminService, private bugapointService: BugapointService) {
  }

  admins: Admin[]
  admin: Admin

  @Input()
  point: Bugapoint

  adminForm = new FormControl('')

  latForm = new FormControl('')
  longForm = new FormControl('')

  descriptionForm = new FormControl('')

  async ngOnInit(): Promise<void> {
    this.adminService.findAll().subscribe((data: any) => {
      this.admins = data;
    })

    await this.adminService.getAdminById(this.point.adminID).subscribe((data: any) => {
      this.admin = data;
      this.adminForm.setValue(this.admin.emailadress)
    });

    this.descriptionForm.setValue(this.point.description)

    this.latForm.setValue(this.point.latitude + '')
    this.longForm.setValue(this.point.longitude + '')


  }

  /**
   *
   */
  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latForm.setValue(position.coords.latitude + '');
        this.longForm.setValue(position.coords.longitude + '');
      })
    }
  }

  /**
   *
   */
  update() {
    console.log(this.bugapointService.updateBugapoint(this.point, Number(this.latForm.value), Number(this.longForm.value),
      1, String(this.descriptionForm.value)))
  }
}

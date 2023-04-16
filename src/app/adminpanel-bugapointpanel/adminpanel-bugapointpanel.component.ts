import {Component, Input, OnInit} from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {FormControl} from "@angular/forms";
import {AdminService} from "../service/admin.service";
import {User} from "../model/user";

@Component({
  selector: 'app-adminpanel-bugapointpanel',
  templateUrl: './adminpanel-bugapointpanel.component.html',
  styleUrls: ['./adminpanel-bugapointpanel.component.css']
})
export class AdminpanelBugapointpanelComponent implements OnInit {

  constructor(private adminService: AdminService) {
  }

  admins: User[]

  @Input()
  point: Bugapoint

  adminForm = new FormControl('')

  latForm = new FormControl('')
  longForm = new FormControl('')

  descriptionForm = new FormControl('')

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((data: any) => {
      this.admins = data;
    })

    this.adminService.getAdminById(this.point.adminId).subscribe((data: any) => {
      const user: User = data;
      console.log(user);
    });
  }

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latForm.setValue(position.coords.latitude + '');
        this.longForm.setValue(position.coords.longitude + '');
      })
    }
  }
}

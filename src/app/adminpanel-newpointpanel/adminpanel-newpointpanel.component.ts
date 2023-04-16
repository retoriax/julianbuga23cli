import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {UserService} from "../service/user-service.service";
import {FormControl} from "@angular/forms";
import {BugapointService} from "../service/bugapoint.service";

@Component({
  selector: 'app-adminpanel-newpointpanel',
  templateUrl: './adminpanel-newpointpanel.component.html',
  styleUrls: ['./adminpanel-newpointpanel.component.css']
})
export class AdminpanelNewpointpanelComponent implements OnInit {

  admins: User[]
  discriminators = new Set<string>

  pTitle = new FormControl('');
  type = new FormControl('');
  description = new FormControl('');
  longitude = new FormControl('');
  latitude = new FormControl('');
  admin = new FormControl('');


  constructor(private userService: UserService, private bugapointService: BugapointService) {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe((data: User[]) => {
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
    this.bugapointService.addBugapoint(String(this.pTitle.value), Number(this.latitude.value),
      Number(this.longitude.value), String(this.type.value), String(this.admin.value));
  }

}

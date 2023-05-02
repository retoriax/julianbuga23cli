import {Component, OnInit} from '@angular/core';
import {Bugapoint} from "../../model/bugapoint";
import {FormControl, FormGroup} from "@angular/forms";
import {BugapointService} from "../../services/bugapoint.service";
import {Admin} from "../../model/admin";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-admin-components-bugapointlist',
  templateUrl: './adminpanel-bugapointlist.component.html',
  styleUrls: ['./adminpanel-bugapointlist.component.css']
})
export class AdminpanelBugapointlistComponent implements OnInit {

  formGroup: FormGroup;
  points: Bugapoint[];
  admins: Admin[];

  lats: FormControl[];
  longs: FormControl[];

  constructor(private bugapointservice: BugapointService, private adminservice: AdminService) {

  }

  ngOnInit(): void {
    this.adminservice.findAll().subscribe((data: Admin[]) => {
      this.admins = data;
      console.log(this.admins)
    })

    this.bugapointservice.findAll().subscribe((data: Bugapoint[]) => {
      this.points = data;
    });

  }


  /**
   * Fills location input fields with present user location.
   *
   * @param i Index to find the right input fields
   */
  getGeoLocation(i: number) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lats[i].setValue(position.coords.latitude + '');
        this.longs[i].setValue(position.coords.longitude + '');
      })
    }
  }

}

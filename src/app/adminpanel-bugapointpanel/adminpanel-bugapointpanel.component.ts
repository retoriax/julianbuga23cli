import {Component, Input, OnInit} from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-adminpanel-bugapointpanel',
  templateUrl: './adminpanel-bugapointpanel.component.html',
  styleUrls: ['./adminpanel-bugapointpanel.component.css']
})
export class AdminpanelBugapointpanelComponent implements OnInit {

  @Input()
  point: Bugapoint

  latForm = new FormControl('')
  longForm = new FormControl('')

  descriptionForm = new FormControl('')

  ngOnInit(): void {
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

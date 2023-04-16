import {Component, OnInit} from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {BugapointService} from "../service/bugapoint.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-adminpanel-bugapointlist',
  templateUrl: './adminpanel-bugapointlist.component.html',
  styleUrls: ['./adminpanel-bugapointlist.component.css']
})
export class AdminpanelBugapointlistComponent implements OnInit {

  formGroup: FormGroup;
  points: Bugapoint[];

  lats: FormControl[];
  longs: FormControl[];

  constructor(private bugapointservice: BugapointService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      inputcontrol: new FormControl()
    })
  }

  ngOnInit(): void {
    this.bugapointservice.findAll().subscribe((data: Bugapoint[]) => {
      this.points = data;
      this.lats = new Array(this.points.length);
      this.longs = new Array(this.points.length);
      let i = 0;
      for (let point of this.points) {
        this.lats[i] = new FormControl('');
        this.longs[i] = new FormControl('');
        i++;
      }
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

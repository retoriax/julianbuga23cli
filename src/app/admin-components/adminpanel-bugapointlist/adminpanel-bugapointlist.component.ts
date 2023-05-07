import {Component, OnInit} from '@angular/core';
import {Bugapoint} from "../../model/bugapoint";
import {BugapointService} from "../../services/bugapoint.service";
import {Admin} from "../../model/admin";
import {AdminService} from "../../services/admin.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-admin-components-bugapointlist',
  templateUrl: './adminpanel-bugapointlist.component.html',
  styleUrls: ['./adminpanel-bugapointlist.component.css']
})
export class AdminpanelBugapointlistComponent implements OnInit {

  points: Bugapoint[];
  admins: Admin[];

  filter: string;
  isLoading: boolean = false;

  constructor(private bugapointservice: BugapointService, private adminservice: AdminService) {

  }

  async ngOnInit() {
    this.admins = await lastValueFrom(this.adminservice.findAll())
  }

  async onFilterChanged(parkId: string) {
    this.filter = parkId;
    this.points = [];
    console.log('parkid: ' + parkId)
    this.isLoading = true;
    this.points = await lastValueFrom(this.bugapointservice.getBugapointsByParkID(parkId))
    this.isLoading = false;
  }




}

import {Component, OnInit} from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {BugapointService} from "../service/bugapoint.service";

@Component({
  selector: 'app-adminpanel-bugapointlist',
  templateUrl: './adminpanel-bugapointlist.component.html',
  styleUrls: ['./adminpanel-bugapointlist.component.css']
})
export class AdminpanelBugapointlistComponent implements OnInit {

  points: Bugapoint[];

  constructor(private bugapointservice: BugapointService) {
  }

  ngOnInit(): void {
    this.bugapointservice.findAll().subscribe((data: Bugapoint[]) => {
      this.points = data;
    });
  }

}

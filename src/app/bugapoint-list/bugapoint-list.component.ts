import {Component, OnInit} from '@angular/core';
import {Bugapoint} from "../model/bugapoint";
import {BugapointServiceService} from "../services/bugapoint-service.service";

@Component({
  selector: 'app-bugapoint-user-list',
  templateUrl: './bugapoint-list.component.html',
  styleUrls: ['./bugapoint-list.component.css']
})
export class BugapointListComponent implements OnInit {
  map:any
  bugapoints: Bugapoint[];

  constructor(private bugapointservice: BugapointServiceService) {
  }
  ngOnInit() {

    this.bugapointservice.findAll().subscribe((data: Bugapoint[]) => {
      this.bugapoints = data;
    });
  }
}

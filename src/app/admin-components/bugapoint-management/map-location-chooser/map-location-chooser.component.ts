import {Component, Input, OnInit} from '@angular/core';
import * as L from "leaflet";
import {ActivatedRoute} from "@angular/router";
import {BugapointService} from "../../../services/bugapoint.service";
import {AdminBugapointService} from "../../../services/admin-services/admin-bugapoint.service";
import {Bugapoint} from "../../../model/bugapoint";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-map-location-chooser',
  templateUrl: './map-location-chooser.component.html',
  styleUrls: ['./map-location-chooser.component.css']
})
export class MapLocationChooserComponent implements OnInit{

  map: any;

  point: Bugapoint[];

  latitude: number;
  longitude: number;

  constructor(private route: ActivatedRoute, private bugapointService: BugapointService,
              private adminbugapointService: AdminBugapointService) {
  }

  ngOnInit(): void {



    this.route.queryParams.subscribe(async (params) => {
      const points$ = this.bugapointService.findAll("whereId=" + params['bugaPointId'])
      this.point = await lastValueFrom(points$)

      console.log(this.point)
    })

    this.map = L.map('map');
    this.map.setView([49.48374114628255, 8.494567173596847], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom:10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

}

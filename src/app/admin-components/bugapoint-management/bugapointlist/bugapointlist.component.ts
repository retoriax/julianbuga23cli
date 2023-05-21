import {Component, OnInit} from '@angular/core';
import {Bugapoint} from "../../../model/bugapoint";
import {BugapointService} from "../../../services/bugapoint.service";
import {Admin} from "../../../model/admin";
import {lastValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {AdminAdminService} from "../../../services/admin-services/admin-admin.service";

@Component({
  selector: 'app-admin-components-bugapointlist',
  templateUrl: './bugapointlist.component.html',
  styleUrls: ['./bugapointlist.component.css']
})
export class BugapointlistComponent implements OnInit {

  points: Bugapoint[];
  admins: Admin[];

  filter: string;
  isLoading: boolean = false;

  constructor(private bugapointservice: BugapointService, private adminservice: AdminAdminService,
              private router: Router) {

  }

  async ngOnInit() {
    this.admins = await lastValueFrom(this.adminservice.findAll());

    await this.onFilterChanged('1')
  }

  /**
   * Wenn User den Park ändert wird diese Methode aufgerufen.
   *
   * @param parkId identifier des Parks
   */
  async onFilterChanged(parkId: string) {
    try {
      this.filter = parkId;
      this.points = [];
      this.isLoading = true;
      const points$ = this.bugapointservice
        .findAll('whereParkId=' + parseInt(parkId) + '&orderBy=title');
      this.points = await lastValueFrom(points$);
    } catch (err) {
      console.error('Error fetching Bugapoints:', err);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Opens the editor for the given point id
   *
   * @param id id of the point
   */
  onEdit(id: number) {
    this.router.navigate(
      ['admin/bugapoints/edit'],
      {queryParams: {bugaPointId: id}}).then()
  }
}

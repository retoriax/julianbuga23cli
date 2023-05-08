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
      const points$ = this.bugapointservice.getBugapointsByParkID(parkId);
      this.points = await lastValueFrom(points$);
      this.sortPoints()
      console.log(this.points)
    } catch (err) {
      console.error('Error fetching Bugapoints:', err);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Sortiert Punkte.
   */
  sortPoints() {
    if (this.points.length > 0) {
      this.points.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        } else if (titleA > titleB) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

}

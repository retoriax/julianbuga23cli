import {Component, OnInit} from '@angular/core';
import {Bugapoint} from "../../../model/bugapoint";
import {BugapointService} from "../../../services/bugapoint.service";
import {Admin} from "../../../model/admin";
import {AdminService} from "../../../services/admin.service";
import {lastValueFrom} from "rxjs";
import {bug} from "ionicons/icons";

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
      const points$ = this.bugapointservice
        .findAll('whereParkId=' + parseInt(parkId) + '&orderBy=title');
      this.points = await lastValueFrom(points$);
    } catch (err) {
      console.error('Error fetching Bugapoints:', err);
    } finally {
      this.isLoading = false;
    }
  }

  onEdit(bugapointId: number) {
    console.log(bugapointId)
  }
}

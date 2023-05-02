import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Bugapoint} from "../../model/bugapoint";
import {FormControl} from "@angular/forms";
import {Admin} from "../../model/admin";
import {AdminService} from "../../services/admin.service";
import {BugapointService} from "../../services/bugapoint.service";
import {DatabaseSaveResponse} from "../../services/DatabaseSaveResponse";
import {AdminBugapointService} from "../../services/admin-services/admin-bugapoint.service";

@Component({
  selector: 'app-admin-components-bugapointpanel',
  templateUrl: './adminpanel-bugapointpanel.component.html',
  styleUrls: ['./adminpanel-bugapointpanel.component.css']
})
export class AdminpanelBugapointpanelComponent implements OnInit {

  constructor(private adminService: AdminService, private bugapointService: BugapointService,
              private elementRef: ElementRef, private renderer: Renderer2,
              private adminBugapointService: AdminBugapointService) {
  }

  @Input()
  admins: Admin[]

  @Input()
  point: Bugapoint

  adminForm = new FormControl('')

  latForm = new FormControl('')
  longForm = new FormControl('')

  descriptionForm = new FormControl('')
  backgroundClass: String = "mat-expansion-panel";

  async ngOnInit(): Promise<void> {
    let pAdmin: Admin = this.admins.find((p: Admin) => p.id === this.point.adminID)!;

    this.adminForm.setValue(pAdmin.emailadress)

    this.descriptionForm.setValue(this.point.description)

    this.latForm.setValue(this.point.latitude + '')
    this.longForm.setValue(this.point.longitude + '')
  }

  /**
   * fills Lat and Long form controls with present geolocation
   */
  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latForm.setValue(position.coords.latitude + '');
        this.longForm.setValue(position.coords.longitude + '');
      })
    }
  }

  /**
   * Updates the bugapoint with the values in the form controls
   */
  async update() {

    const elem = this.elementRef.nativeElement.querySelector("mat-expansion-panel");

    try {
      const bugaPointResponse: DatabaseSaveResponse = await this.adminBugapointService.updateBugapoint(
        this.point,
        Number(this.latForm.value),
        Number(this.longForm.value),
        String(this.adminForm.value),
        String(this.descriptionForm.value).trim()
      );


      if (bugaPointResponse.success) {
        this.renderer.addClass(elem, "success-animation");
      } else {
        this.renderer.addClass(elem, "fail-animation");
      }
    } catch (error) {
      this.renderer.addClass(elem, "fail-animation");
    }
  }


  /**
   * Deletes this bugapoint.
   */
  delete() {
    this.adminBugapointService.deleteBugapointById(this.point.id);
    window.location.reload()
  }
}

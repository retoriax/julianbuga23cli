import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Bugapoint} from "../../../model/bugapoint";
import {FormControl} from "@angular/forms";
import {Admin} from "../../../model/admin";
import {AdminService} from "../../../services/admin.service";
import {BugapointService} from "../../../services/bugapoint.service";
import {DatabaseSaveResponse} from "../../../services/DatabaseSaveResponse";
import {AdminBugapointService} from "../../../services/admin-services/admin-bugapoint.service";
import {BugapointlistComponent} from "../bugapointlist/bugapointlist.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-components-bugapointpanel',
  templateUrl: './bugapointpanel.component.html',
  styleUrls: ['./bugapointpanel.component.css']
})
export class BugapointpanelComponent implements OnInit {

  constructor(private adminService: AdminService,
              private bugapointService: BugapointService,
              private elementRef: ElementRef, private renderer: Renderer2,
              private adminBugapointService: AdminBugapointService,
              private router: Router) {
  }

  @Input()
  admins: Admin[]

  @Input()
  point: Bugapoint



  adminForm = new FormControl('')

  latForm = new FormControl('')
  lngForm = new FormControl('')

  descriptionForm = new FormControl('')
  async ngOnInit(): Promise<void> {
    let pAdmin: Admin = this.admins.find((p: Admin) => p.id === this.point.adminID)!;

    this.adminForm.setValue(pAdmin.emailadress)

    this.descriptionForm.setValue(this.point.description)

    this.latForm.setValue(this.point.latitude + '')
    this.lngForm.setValue(this.point.longitude + '')
  }

  /**
   * fills Lat and Long form controls with present geolocation
   */
  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latForm.setValue(position.coords.latitude + '');
        this.lngForm.setValue(position.coords.longitude + '');
      })
    }
  }

  /**
   * Updates the bugapoint with the values in the form controls
   */
  async update() {
    const elem = this.elementRef.nativeElement.querySelector("mat-expansion-panel");

    try {
      let query = `newLat=${this.latForm.value}&newLng=${this.lngForm.value}
        &newDescription=${this.descriptionForm.value}&newAdminEmailaddress=${this.adminForm.value}`

      const bugaPointResponse: DatabaseSaveResponse = await this.adminBugapointService.updateBugapoint(
        this.point,
        query
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
  async delete() {
    await this.adminBugapointService.deleteBugapointById(this.point.id);

  }

  openMapChooser() {
    const queryParams = {bugaPointId: this.point.id}
    this.router.navigate(['/admin/bugapoints/location'], { queryParams }).then()
  }
}

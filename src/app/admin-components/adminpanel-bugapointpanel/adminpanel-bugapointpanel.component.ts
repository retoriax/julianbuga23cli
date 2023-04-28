import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Bugapoint} from "../../model/bugapoint";
import {FormControl} from "@angular/forms";
import {Admin} from "../../model/admin";
import {AdminService} from "../../services/admin.service";
import {BugapointService} from "../../services/bugapoint.service";
import {DatabaseSaveResponse} from "../../services/DatabaseSaveResponse";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-components-bugapointpanel',
  templateUrl: './adminpanel-bugapointpanel.component.html',
  styleUrls: ['./adminpanel-bugapointpanel.component.css']
})
export class AdminpanelBugapointpanelComponent implements OnInit {

  constructor(private adminService: AdminService, private bugapointService: BugapointService,
              private elementRef: ElementRef, private renderer: Renderer2) {
  }

  admins: Admin[]
  admin: Admin

  @Input()
  point: Bugapoint

  adminForm = new FormControl('')

  latForm = new FormControl('')
  longForm = new FormControl('')

  descriptionForm = new FormControl('')
  backgroundClass: String = "mat-expansion-panel";

  async ngOnInit(): Promise<void> {
    this.adminService.findAll().subscribe((data: any) => {
      this.admins = data;
    })

    await this.adminService.getAdminById(this.point.adminID).subscribe((data: any) => {
      this.admin = data;
      this.adminForm.setValue(this.admin.emailadress)
    });

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
    try {
      const admin = await new Promise<Admin>((resolve, reject) => {
        const adminResponse: Subscription = this.adminService.getAdminByEmailadress(String(this.adminForm.value)).subscribe(
          (data: Admin) => {
            resolve(data);
          },
          (error: any) => {
            reject(error);
          }
        );
      });

      const bugaPointResponse: DatabaseSaveResponse = await this.bugapointService.updateBugapoint(
        this.point,
        Number(this.latForm.value),
        Number(this.longForm.value),
        admin.id,
        String(this.descriptionForm.value).trim()
      );

      const elem = this.elementRef.nativeElement.querySelector("mat-expansion-panel");

      if (bugaPointResponse.success) {
        this.renderer.addClass(elem, "success-animation");
      } else {
        this.renderer.addClass(elem, "fail-animation");
      }
    } catch (error) {
      console.error(error);
    }
  }


  /**
   * Deletes this bugapoint.
   */
  delete() {
    this.bugapointService.deleteBugapointById(this.point.id);
    window.location.reload()
  }
}

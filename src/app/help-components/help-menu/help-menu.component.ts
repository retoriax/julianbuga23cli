import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {AdminAdminService} from "../../services/admin-services/admin-admin.service";

@Component({
  selector: 'app-help-menu',
  templateUrl: './help-menu.component.html',
  styleUrls: ['./help-menu.component.css']
})
export class HelpMenuComponent {
  constructor(private authservice: AuthenticationService, private router: Router, private adminService: AdminAdminService) {
  }
  adminName: string|null;

  /**
   * Test method to check if admin is logged in.
   */
  routeHelp() {
    this.authservice.checkIfLoggedIn((success: boolean) => {
      if (success) {
        console.log("Du bist eingeloggt!");
        this.router.navigate(['/admin/menu'])
      } else {
        console.log("Du bist nicht eingeloggt.");
        this.router.navigate(['/login'])
      }
    });
  }

  ngOnInit(): void {
    this.adminName = null;
    this.adminService.getPresentName().subscribe(name => {
      this.adminName = name;
    })
  }

}

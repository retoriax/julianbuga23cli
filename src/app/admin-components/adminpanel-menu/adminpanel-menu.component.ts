import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {AdminAdminService} from "../../services/admin-services/admin-admin.service";

@Component({
  selector: 'app-admin-components-menu',
  templateUrl: './adminpanel-menu.component.html',
  styleUrls: ['./adminpanel-menu.component.css']
})
export class AdminpanelMenuComponent implements OnInit {
  adminName: string;

  constructor(private authService: AuthenticationService, private adminAdminService: AdminAdminService) {

  }

  public logout(){
    this.authService.logout();
  }

  ngOnInit(): void {
    this.adminAdminService.getPresentName().subscribe(name => {
      this.adminName = name
    })
  }

}

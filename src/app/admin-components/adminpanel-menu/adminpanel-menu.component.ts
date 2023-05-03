import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-admin-components-menu',
  templateUrl: './adminpanel-menu.component.html',
  styleUrls: ['./adminpanel-menu.component.css']
})
export class AdminpanelMenuComponent {
  adminName: string;

  constructor(private authService: AuthenticationService) {

  }

  public logout(){
    this.authService.logout();
  }

}

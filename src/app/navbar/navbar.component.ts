import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{


  constructor(private router: Router, private authservice: AuthenticationService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    const list = document.querySelectorAll('.list');
    const self = this;
    function activeLink(this: HTMLElement){
        list.forEach((item) =>
        item.classList.remove("active"));
        this.classList.add("active");
        self.cookieService.set('activeItem', this.id);
    }

    let active = document.getElementById(this.cookieService.get('activeItem'));
    list.forEach((item) => {
      item.classList.remove("active");
      active?.classList.add("active");
    });


    list.forEach((item) => {
      item.addEventListener('click', activeLink);
    });
  }

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
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {CookieService} from 'ngx-cookie-service';
import {NavigationService} from "../services/navigation.service";
import {Navigation} from "../services/navigation";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private navigationService: NavigationService, private router: Router, private authservice: AuthenticationService, private cookieService: CookieService) {}

  ngOnInit(): void {
    const list = document.querySelectorAll('.list');
    const self = this;

    /**
     * Adds the class "active" to an element to move the indicator to that element.
     * @param element Element
     */
    function setActive(element: HTMLElement) {
      list.forEach((item) =>
        item.classList.remove("active"));
      element.classList.add("active");
      if (self.cookieService.check('activeItem')) self.cookieService.delete('activeItem');
      self.cookieService.set('activeItem', element.id);
    }

    /**
     * Checks the cookies for a current selection after site refresh.
     */
    if (this.cookieService.check('activeItem')) {
      let active = document.getElementById(this.cookieService.get('activeItem'));
      list.forEach((item) => {
        item.classList.remove("active");
        active?.classList.add("active");
      });
    }

    /**
     * Adds an event listener to every item of the navbar.
     */
    list.forEach((item) => {
      item.addEventListener('click', activeLink);
    });

    function activeLink(this: HTMLElement){
      setActive(this);
    }

    /**
     * Sets the indicator to an element if there is a navigation event.
     */
    this.navigationService.navigationEvent.subscribe((path: string) => {
        switch (path) {
          case Navigation.RoutePlanner: setActive(list.item(0) as HTMLElement); break;
          case Navigation.Blank: setActive(list.item(1) as HTMLElement); break;
          case Navigation.Map: setActive(list.item(2) as HTMLElement); break;
          case Navigation.Blank: setActive(list.item(3) as HTMLElement); break;
          case Navigation.Login || Navigation.Register || Navigation.Help: setActive(list.item(4) as HTMLElement); break;
        }
      });

  }
}

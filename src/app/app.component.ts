import { Component } from '@angular/core';
import { inject } from '@vercel/analytics';
import {CookieConsentService} from "./services/cookie-consent.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  consent: boolean = false;

  constructor(private cookieConsentService: CookieConsentService, private cookieService: CookieService) {
    this.title = 'Buga23 App';
    this.cookieConsentService.cookieConsent.subscribe((bool)=> {
      this.consent = bool;
    })
    if (this.cookieService.get("consent") == "true") {
      this.consent = true;
    }
    inject();
  }
}

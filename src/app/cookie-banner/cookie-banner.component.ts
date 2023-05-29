import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {CookieConsentService} from "../services/cookie-consent.service";

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent {
  constructor(private cookieConsentService: CookieConsentService) {}

  accept() {
    this.cookieConsentService.setConsent(true);
  }
}

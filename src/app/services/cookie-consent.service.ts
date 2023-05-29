import {EventEmitter, Injectable, Output} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Bugapoint} from "../model/bugapoint";

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  @Output() cookieConsent = new EventEmitter<boolean>();

  constructor(private cookieService: CookieService) {
    if (this.cookieService.get("consent") == "true") {
      this.setConsent(true);
    }
  }
  consent: boolean = false;

  setConsent(consent: boolean) {
    this.consent = consent;
    this.cookieService.set("consent", consent + "");
    this.cookieConsent.emit(consent);
  }
}

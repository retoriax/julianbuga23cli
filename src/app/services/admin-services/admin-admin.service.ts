import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../authentication.service";
import {Admin} from "../../model/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminAdminService {

  private subPath = '/management/admin';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getPresentName(): Observable<string> {
    return this.http.get<{firstname: string}>(environment.backEndUrl + this.subPath + '/firstname', this.authService.getAuthheader()).pipe(
      map(response => response.firstname),
      map(firstname => firstname.toString())
    )
  }

  /**
   * returns all admins
   */
  findAll(): Observable<Admin[]> {
    return this.http.get<Admin[]>(environment.backEndUrl + `${this.subPath}/list`, this.authService.getAuthheader());
  }
}

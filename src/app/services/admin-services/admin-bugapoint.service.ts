import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Bugapoint} from "../../model/bugapoint";
import {DatabaseSaveResponse} from "../DatabaseSaveResponse";
import {environment} from "../../../environments/environment.development";
import {AuthenticationService} from "../authentication.service";
import {LoginStatusrequest} from "../../model/login-statusrequest";
import {CookieService} from "ngx-cookie-service";
import {catchError, lastValueFrom, of, throwError} from "rxjs";

/**
 * Bugapoint service for admins.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminBugapointService {

  private subPath = '/api/v1/admin/bugapoint';

  constructor(private http: HttpClient, private authService: AuthenticationService, private cookieService:CookieService)
  { }


  /**
   * Sends a post request to the server to add a new bugapoint to the database.
   *
   * @param bugapoint
   */
  saveBugapoint(bugapoint: Bugapoint) : Promise<DatabaseSaveResponse> {
    const statusrequest: LoginStatusrequest = new LoginStatusrequest();
    statusrequest.token = this.cookieService.get('token');

    return lastValueFrom(this.http.post<DatabaseSaveResponse>(environment.backEndUrl + `${this.subPath}/save`, bugapoint,
      this.authService.getAuthheader())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const dbErrorResponse: DatabaseSaveResponse = {
            success: false,
            message: error.error.message
          };
          return of(dbErrorResponse)
        })))
  }



  /**
   * Updates the bugapoint.
   *
   * @param bugapoint bugapoint which gets updated
   * @param newLat new latitude
   * @param newLong new longitude
   * @param newAdminEmailaddress new admin email address
   * @param newDescription new description
   */
  async updateBugapoint(bugapoint: Bugapoint, newLat?: number, newLong?: number, newAdminEmailaddress?: string, newDescription?: string): Promise<DatabaseSaveResponse> {
    const statusrequest: LoginStatusrequest = new LoginStatusrequest();
    statusrequest.token = this.cookieService.get('token');

    const url = environment.backEndUrl + `${this.subPath}/update` + `?bugaPointId=${bugapoint.id}
     &newLat=${newLat !== undefined ? newLat : bugapoint.latitude}
     &newLong=${newLong !== undefined ? newLong : bugapoint.longitude}
     &newDescription=${newDescription !== undefined ? newDescription : bugapoint.description}
     &newAdminEmailaddress=${newAdminEmailaddress !== undefined ? newAdminEmailaddress : bugapoint.adminID}`;

    return lastValueFrom(this.http.put<DatabaseSaveResponse>(url, null, this.authService.getAuthheader()));
  }


  /**
   * Deletes a bugapoint with the id.
   *
   * @param id identifier
   */
  deleteBugapointById(id: number) {
    return this.http.delete<string[]>(environment.backEndUrl + `${this.subPath}/delete?id=${id}`, this.authService.getAuthheader())
      .subscribe((data: any) => {
        console.log(data)
      });
  }



}

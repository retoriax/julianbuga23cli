import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Bugapoint} from "../../model/bugapoint";
import {DatabaseSaveResponse} from "../DatabaseSaveResponse";
import {environment} from "../../../environments/environment.development";
import {AuthenticationService} from "../authentication.service";
import {LoginStatusrequest} from "../../model/login-statusrequest";
import {CookieService} from "ngx-cookie-service";
import {catchError, lastValueFrom, of} from "rxjs";

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
  async saveBugapoint(bugapoint: Bugapoint) : Promise<DatabaseSaveResponse> {
    const statusrequest: LoginStatusrequest = new LoginStatusrequest();
    statusrequest.token = this.cookieService.get('token');

    return lastValueFrom(this.http.post<DatabaseSaveResponse>(environment.backEndUrl + `${this.subPath}/save`, bugapoint,
      this.authService.getAuthheader())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const dbErrorResponse: DatabaseSaveResponse = {
            success: false,
            message: error.error.message,
          };
          return of(dbErrorResponse)
        })))
  }



  /**
   * Updates the bugapoint.
   *
   * @param bugapoint bugapoint which gets updated
   * @param updates
   */
  async updateBugapoint(bugapoint: Bugapoint, updates: Bugapoint): Promise<DatabaseSaveResponse> {
    const statusrequest: LoginStatusrequest = new LoginStatusrequest();
    statusrequest.token = this.cookieService.get('token');

    return lastValueFrom(this.http.put<DatabaseSaveResponse>(environment.backEndUrl + `${this.subPath}/update?bugaPointId=${bugapoint.id}`, updates,
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
   * Deletes a bugapoint with the id.
   *
   * @param id identifier
   */
  async deleteBugapointById(id: number): Promise<DatabaseSaveResponse> {
    try {
      return await lastValueFrom(this.http.delete<DatabaseSaveResponse>(
        environment.backEndUrl + `${this.subPath}/delete?id=${id}`,
        this.authService.getAuthheader()
      ));
    } catch (error) {
      return new class implements DatabaseSaveResponse {
        message: string = "Failed";
        success: boolean = false;
      }
    }
  }



}

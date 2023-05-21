import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Admin} from "../model/admin";
import {environment} from "../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private subUrl = '/management';

  constructor(private http: HttpClient) { }

  /**
   * returns all admins
   */
  findAll(): Observable<Admin[]> {
    return this.http.get<Admin[]>(environment.backEndUrl + `${this.subUrl}/list`);
  }

  /**
   * returns admin with the given id
   *
   * @param adminId id of admin
   */
  getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(environment.backEndUrl + `${this.subUrl}/id/${adminId}`);
  }

  /**
   * Returns admin with the given email address
   *
   * @param emailaddress email address of the admin
   */
  getAdminByEmailadress(emailaddress: string): Observable<Admin> {
    return this.http.get<Admin>(environment.backEndUrl + `${this.subUrl}/emailaddress/${emailaddress}`);
  }

}

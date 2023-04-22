import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Admin} from "../model/admin";
import {environment} from "../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private subUrl = '/admin';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Admin[]> {
    return this.http.get<Admin[]>(environment.backEndUrl + `${this.subUrl}/users`);
  }

  getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(environment.backEndUrl + `${this.subUrl}/adminOfId?adminId=${adminId}`);
  }

}

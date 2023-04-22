import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../model/user";
import {environment} from "../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private subUrl = '/admin';

  constructor(private http: HttpClient) { }

  getAdminById(adminId: number): Observable<User> {
    return this.http.get<User>(environment.backEndUrl + `${this.subUrl}/id/${adminId}`);
  }

  findAll() {
    return this.http.get<User[]>(environment.backEndUrl + `${this.subUrl}/list`);
  }
}

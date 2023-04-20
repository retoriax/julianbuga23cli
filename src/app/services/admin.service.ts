import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../model/user";
import {Bugapoint} from "../model/bugapoint";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getAdminById(adminId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/adminOfId?adminId=${adminId}`);
  }

}

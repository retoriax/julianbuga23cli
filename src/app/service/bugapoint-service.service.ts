import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {Bugapoint} from "../model/bugapoint";

@Injectable({
  providedIn: 'root'
})
export class BugapointServiceService {
  private bugapointURL: string;

  constructor(private http: HttpClient) {
    this.bugapointURL = 'http://localhost:8080/bugapoints';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.bugapointURL);
  }

  public save(bugapoint: Bugapoint) {
    return this.http.post<Bugapoint>(this.bugapointURL, bugapoint);
  }
}

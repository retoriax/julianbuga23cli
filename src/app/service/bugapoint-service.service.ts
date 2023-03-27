import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  public findAll(): Observable<Bugapoint[]> {
    return this.http.get<Bugapoint[]>(this.bugapointURL);
  }

  public save(bugapoint: Bugapoint) {
    return this.http.post<Bugapoint>(this.bugapointURL, bugapoint);
  }



}

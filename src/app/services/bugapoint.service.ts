import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Bugapoint} from "../model/bugapoint";
import {DatabaseSaveResponse} from "./DatabaseSaveResponse";
import {environment} from "../../environments/environment.development";



@Injectable({
  providedIn: 'root'
})
export class BugapointService {

  private subPath = '/bugapoint';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Bugapoint[]> {
    return this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list`);
  }

  getBugapoints(): Observable<Bugapoint[]> {
    return this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list`);
  }

  getFilteredBugapoints(discriminators: Set<string>): Observable<Bugapoint[]> {
    const discriminatorList = Array.from(discriminators); // Convert Set to array
    const discriminatorParams = discriminatorList.join(',');

    return this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list/filter`, {
      params: {
        discriminators: Array.from(discriminators).join(',')
      }
    });
  }


  saveBugapoint(bugapoint: Bugapoint): Observable<DatabaseSaveResponse> {
    return this.http.post<DatabaseSaveResponse>(environment.backEndUrl + `${this.subPath}/save`, bugapoint);
  }

  getDiscriminators(): Observable<string[]> {
    return this.http.get<string[]>(environment.backEndUrl + `${this.subPath}/discriminators`);
  }

}

import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Bugapoint} from "../model/bugapoint";
import {DatabaseSaveResponse} from "./DatabaseSaveResponse";
import {environment} from "../../environments/environment.development";
import {map} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class BugapointService {

  private subPath = '/bugapoint';

  constructor(private http: HttpClient) { }

  /**
   * returns all bugapoints
   */
  findAll(): Observable<Bugapoint[]> {
    return this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list`);
  }

  /**
   * returns all bugapoints
   */
  getBugapoints(): Observable<Bugapoint[]> {
    return this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list`);
  }

  /**
   * Returns all bugapoints with the given discriminators.
   *
   * @param discriminators discriminators
   */
  getFilteredBugapoints(discriminators: Set<string>): Observable<Bugapoint[]> {
    //const discriminatorList = Array.from(discriminators); // Convert Set to array
    //const discriminatorParams = discriminatorList.join(',');

    return this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list/filter`, {
      params: {
        discriminators: Array.from(discriminators).join(',')
      }
    });
  }


  /**
   * Sends a post request to the server to add a new bugapoint to the database.
   *
   * @param bugapoint
   */
  saveBugapoint(bugapoint: Bugapoint) {
    return this.http.post<DatabaseSaveResponse>(environment.backEndUrl + `${this.subPath}/save`, bugapoint)
      .subscribe((data: any) => {
      console.log(data);
    });
  }

  /**
   * Returns all discriminators.
   */
  getDiscriminators(): Observable<string[]> {
    return this.http.get<string[]>(environment.backEndUrl + `${this.subPath}/discriminators`);
  }

  searchByTitle(searchtitle: string): Observable<Bugapoint[]> {
    return this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list`)
      .pipe(map(value => value.filter(value1 => value1.title.toLowerCase().trim().includes(searchtitle.toLowerCase().trim()))));
  }

}

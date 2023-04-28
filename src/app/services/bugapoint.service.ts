import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Bugapoint} from "../model/bugapoint";
import {DatabaseSaveResponse} from "./DatabaseSaveResponse";
import {environment} from "../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class BugapointService {

  private subPath = '/bugapoint';

  constructor(private http: HttpClient) {
  }

  /**
   * returns all bugapoints
   */
  findAll(): Observable<Bugapoint[]> {
    return this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list`);
  }

  /**
   * Returns all discriminators.
   */
  getDiscriminators(): Observable<string[]> {
    return this.http.get<string[]>(environment.backEndUrl + `${this.subPath}/discriminators`);
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
    return this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list/filter`, {
      params: {
        discriminators: Array.from(discriminators).join(',')
      }
    });
  }




}

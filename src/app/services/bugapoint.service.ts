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

  /**
   * Updates the bugapoint.
   *
   * @param bugapoint bugapoint which gets updated
   * @param newLat new latitude
   * @param newLong new longitude
   * @param newAdminId new admin id
   * @param newDescription new description
   */
  async updateBugapoint(bugapoint: Bugapoint, newLat?: number, newLong?: number, newAdminId?: number,
                        newDescription?: string): Promise<DatabaseSaveResponse> {

    const url = environment.backEndUrl + `${this.subPath}/update` + `?bugaPointId=${bugapoint.id}
     &newLat=${newLat !== undefined ? newLat : bugapoint.latitude}
     &newLong=${newLong !== undefined ? newLong : bugapoint.longitude}
     &newDescription=${newDescription !== undefined ? newDescription : bugapoint.description}
     &newAdminId=${newAdminId !== undefined ? newAdminId : bugapoint.adminID}`;

    try {
      let response = await this.http.put(url, null).toPromise();
      return response as DatabaseSaveResponse;
    } catch (e) {
      return new class implements DatabaseSaveResponse {
        message: string;
        success: boolean = false;
      }
    }
  }


  /**
   * Deletes a bugapoint with the id.
   *
   * @param id identifier
   */
  deleteBugapointById(id: number) {
    return this.http.delete<string[]>(environment.backEndUrl + `${this.subPath}/delete?id=${id}`)
      .subscribe((data: any) => {
      console.log(data)
    });
  }

  searchByTitle(searchtitle: string): Observable<Bugapoint[]> {
    return this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list`)
      .pipe(map(value => value.filter(value1 => value1.title.toLowerCase().trim().includes(searchtitle.toLowerCase().trim()))));
  }

}

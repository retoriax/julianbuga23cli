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


}

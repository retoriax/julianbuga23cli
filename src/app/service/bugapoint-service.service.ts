import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bugapoint} from "../model/bugapoint";

@Injectable({
  providedIn: 'root'
})
export class BugapointServiceService {
  private bugapointURL: string;

  constructor(private http: HttpClient) {
    this.bugapointURL = 'http://localhost:8080/bugapoint';
  }

  public findAll(): Observable<Bugapoint[]> {
    return this.http.get<Bugapoint[]>(this.bugapointURL);
  }

  public save(bugapoint: Bugapoint) {
    return this.http.post<Bugapoint>(this.bugapointURL, bugapoint);
  }
  getData(): Observable<any>  {
    return this.http.get(this.bugapointURL);
  }

  public getDiscriminators(): any {
    return this.http.get(this.bugapointURL + '/discriminators')
  }

  public filterBugapoints(selectedDiscriminators: Set<string>): Observable<Bugapoint[]> {
    let params = new HttpParams();
    selectedDiscriminators.forEach(discriminator => {
      params = params.append('discriminators', discriminator);
    });

    return this.http.get<Bugapoint[]>(this.bugapointURL + '/list/filter', { params: params });
  }


}

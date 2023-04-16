import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bugapoint} from "../model/bugapoint";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class BugapointService {
  private bugapointURL: string;

  constructor(private http: HttpClient) {
    this.bugapointURL = 'http://localhost:8080/bugapoints';
  }

  public findAll(): Observable<Bugapoint[]> {
    return this.http.get<Bugapoint[]>(this.bugapointURL);
  }

  addBugapoint(title: string, latitude: number, longitude: number, type: string, adminEmail: string): Observable<any> {
    const body = { title: title, latitude: latitude, longitude: longitude, type: type, adminEmail: adminEmail };
    console.log(environment.baseUrl + '/addBugapoint', body);
    return this.http.post(environment.baseUrl + '/addBugapoint', body);
  }
  getData(): Observable<any>  {
    return this.http.get(this.bugapointURL);
  }

  public getDiscriminators(): any {
    return this.http.get('http://localhost:8080/getDiscriminators')
  }

  public filterBugapoints(selectedDiscriminators: Set<string>): Observable<Bugapoint[]> {
    let params = new HttpParams();
    selectedDiscriminators.forEach(discriminator => {
      params = params.append('discriminators', discriminator);
    });

    return this.http.get<Bugapoint[]>('http://localhost:8080/filterBugapoints', { params: params });
  }


}

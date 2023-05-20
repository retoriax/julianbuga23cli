import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";
import {Park} from "../model/park";

@Injectable({
  providedIn: 'root'
})
export class ParkService {

  private subPath = '/park';

  constructor(private http: HttpClient) { }


  findAll(): Observable<Park[]> {
    return this.http.get<Park[]>(environment.backEndUrl + `${this.subPath}/list`);
  }

  getPark(id: number): Observable<Park> {
    return this.http.get<Park>(environment.backEndUrl + `${this.subPath}/id/` + id)
  }


}

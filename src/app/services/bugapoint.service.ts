import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Bugapoint} from "../model/bugapoint";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class BugapointService {

  private subPath = '/bugapoint';
  private reload$ = new Subject();
  private bugapointCache$: Observable<Bugapoint[]>|null;
  private discriminatorCache$: Observable<string[]>|null;

  constructor(private http: HttpClient) { }

  /**
   * Clears the caches.
   */
  forceReload() {
    this.reload$.next(null);
    this.discriminatorCache$ = null;
    this.bugapointCache$ = null;
  }

  /**
   * returns all bugapoints
   */
  findAll(query?: string): Observable<Bugapoint[]> {
    return this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list?` + query);
  }

  /**
   * Returns all discriminators.
   */
  getDiscriminators(): Observable<string[]> {
    return this.http.get<string[]>(environment.backEndUrl + `${this.subPath}/discriminators`);
  }

}

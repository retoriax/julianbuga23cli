import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, shareReplay, Subject, takeUntil} from 'rxjs';
import {Bugapoint} from "../model/bugapoint";
import {DatabaseSaveResponse} from "./DatabaseSaveResponse";
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
  findAll(): Observable<Bugapoint[]> {
    if (!this.bugapointCache$) {
      //Cache
      this.bugapointCache$ = this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list`).pipe(
        takeUntil(this.reload$),
        shareReplay(1));
    }
    return this.bugapointCache$;
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
    return this.findAll();
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

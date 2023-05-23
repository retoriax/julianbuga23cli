import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, shareReplay, Subject, takeUntil} from 'rxjs';
import {Bugapoint} from "../model/bugapoint";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class BugapointService {

  private subPath = '/open/bugapoint';
  private reload$: Subject<any>;
  private bugapointCache$: Observable<Bugapoint[]>|null;
  private discriminatorCache$: Observable<string[]>|null;

  constructor(private http: HttpClient) {
    this.reload$ = new Subject<any>();
    this.findAll();
    this.getDiscriminators();
    setInterval(this.forceReload, 30000)
  }

  /**
   * Clears the caches.
   */
  forceReload() {
    this.reload$?.next(null);
    this.discriminatorCache$ = null;
    this.bugapointCache$ = null;
  }

  /**
   * returns all bugapoints
   */
  findAll(query?: string): Observable<Bugapoint[]> {
    if (!this.bugapointCache$) {
      this.bugapointCache$ = this.http.get<Bugapoint[]>(environment.backEndUrl + `${this.subPath}/list?` + query).pipe(
        takeUntil(this.reload$),
        shareReplay(1)
      );
    }
    return this.bugapointCache$;
  }

  /**
   * Returns all discriminators.
   */
  getDiscriminators(): Observable<string[]> {
    if (!this.discriminatorCache$) {
      this.discriminatorCache$ = this.http.get<string[]>(environment.backEndUrl + `${this.subPath}/discriminators`).pipe(
        takeUntil(this.reload$),
        shareReplay(1)
      );
    }
    return this.discriminatorCache$;
  }

}

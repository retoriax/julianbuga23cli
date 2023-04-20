import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../model/registerrequest";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string;
  private environment: any;
  constructor(private http: HttpClient) {
    this.url = "http://localhost:8080/api/v1/auth";
  }

  public register(request: RegisterRequest) {
    return this.http.post(this.url + "/register" ,request).subscribe(data => console.log("registered account" + data));
  }
}

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
    console.log("hallo");
    //return this.http.post<RegisterRequest>("localhost:8080/api/v1/auth/register", request);

    const body = { firstname: "Julian", lastname: "Sammet", email: "julian@sammet.de", password: "1234" };

    console.log('http://localhost:8080/api/v1/auth/register', body);

    return this.http.post("http://localhost:8080/api/v1/auth/register" ,body);
  }
}

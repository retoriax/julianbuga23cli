import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../model/registerrequest";
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string;
  private environment: any;
  constructor(private http: HttpClient,private cookieService: CookieService) {
    this.url = "http://localhost:8080/api/v1/auth";
  }

  public register(request: RegisterRequest) {
    const now= new Date();
    // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
    const expires = new Date(now.getTime() + 60 * 60 * 1000);

    //https://tkacz.pro/how-to-securely-store-jwt-tokens/
    return this.http.post<RegisterResponse>(this.url + "/register" ,request).subscribe(data => {
      console.log("registered account" + JSON.stringify(data))
      this.cookieService.set('token', data.token, {
        secure: true,
        sameSite: 'Lax',
        //httpOnly: true -> doesn't exist. Standard already ? No
        // not needed but nice to have
        expires: expires // FYI this is UTC time zone

      })

      let a: String = this.cookieService.get('token');

      let bearer: string = "Bearer "+ this.cookieService.get('token');
      const authHeader = {
        headers: new HttpHeaders({
          'Authorization':bearer
        })
      }
        //,{headers: authHeader.headers}
         this.http.get("http://localhost:8080/api/v1/admin/users",{headers: authHeader.headers})
         .subscribe(data => {
          console.log(data);
        })

    });
  }
}

interface RegisterResponse {
  token: string;
}


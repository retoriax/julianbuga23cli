import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../model/registerrequest";
import {CookieService} from 'ngx-cookie-service';
import {loginrequest} from "../model/loginrequest";
import {LoginStatusrequest} from "../model/login-statusrequest";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerUrl: string;
  private loginUrl: string;
  private loginStatusUrl: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.registerUrl = "http://localhost:8080/api/v1/auth/register";
    this.loginUrl = "http://localhost:8080/api/v1/auth/authenticate"
    this.loginStatusUrl = "http://localhost:8080/api/v1/auth/checkToken"


  }

  public register(request: RegisterRequest) {

    this.http.post<authResponse>(this.registerUrl, request).subscribe({
      next: (data) => {
        this.setCookie(data)
      },
      error: (error: any) => {
          console.error(error);
          // @TODO visual response in frontend
      },
      complete: () => {
        console.log('Register request completed');
      }
    });

  }

  public login(request: loginrequest) {
    this.http.post<authResponse>(this.loginUrl, request).subscribe({
      next: (data) => {
        this.setCookie(data)
      },
      error: (error: any) => {
        if (error.status === 403) {
          console.error('Unauthorized access');
          // @TODO visual response in frontend
        } else {
          console.error(error);
          // @TODO visual response in frontend
        }
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }

  public checkIfLoggedIn(callback: (success: boolean) => void) {
    const statusrequest: LoginStatusrequest = new LoginStatusrequest();
    statusrequest.token = this.cookieService.get('token');
    console.log('Authorization header:' + statusrequest);
    this.http.post<boolean>(this.loginStatusUrl, statusrequest).subscribe({
      next: (data) => {
        if (data) {
          console.log("eingeloggt service")
          callback(true);
        } else {
          console.log("nicht eingeloggt service ")
          callback(false);
        }
      },
      error: (error: any) => {
        console.error(error);
        callback(false);
      },
      complete: () => {
        console.log('Login status check completed');
      }
    });
  }
  // UTC time zone
  getExpirationDate() {
    // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
    const hour: number = 60 * 60 * 1000
    const now = new Date();
    return new Date(now.getTime() + hour);
  }

  getAuthheader(){
    return {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.cookieService.get('token')
      })
    }
  }

  setCookie(data : authResponse){
    //https://tkacz.pro/how-to-securely-store-jwt-tokens/
    this.cookieService.set('token', data.token, {
      secure: true,
      sameSite: 'Lax',
      //httpOnly: true
      expires: this.getExpirationDate()
    })
  }
}

interface authResponse {
  token: string;
}


/*
 let a: String = this.cookieService.get('token');

      let bearer: string = "Bearer " + this.cookieService.get('token');
      const authHeader = {
        headers: new HttpHeaders({
          'Authorization': bearer
        })
      }
      //,{headers: authHeader.headers}
      this.http.get("http://localhost:8080/api/v1/admin/users", {headers: authHeader.headers})
        .subscribe(data => {
          console.log(data);
        })

 */

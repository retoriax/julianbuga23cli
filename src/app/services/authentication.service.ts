import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../model/registerrequest";
import {CookieService} from 'ngx-cookie-service';
import {loginrequest} from "../model/loginrequest";
import {LoginStatusrequest} from "../model/login-statusrequest";
import {Router} from '@angular/router';
import {environment} from "../../environments/environment.development";
import {NavigationService} from "./navigation.service";
import {Navigation} from "./navigation";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerUrl: string;
  private loginUrl: string;
  private loginStatusUrl: string;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router,
              private navigation:NavigationService) {
    this.registerUrl = environment.backEndUrl + "/open/auth/register";
    this.loginUrl = environment.backEndUrl + "/open/auth/authenticate"
    this.loginStatusUrl = environment.backEndUrl + "/open/auth/checkToken"

  }

  public register(request: RegisterRequest) {
    this.http.post(this.registerUrl, request).subscribe({
      next: (data) => {
        this.setCookie(data)
        this.router.navigate(['/admin/menu'])
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
    this.http.post(this.loginUrl, request).subscribe({
      next: (data) => {
        this.setCookie(data)
        this.router.navigate(['/admin/menu'])
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

  public logout(){
    this.cookieService.delete("token");
    this.navigation.navigate(Navigation.Login);
  }

  // UTC time zone
  getExpirationDate() {
    // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
    const hour: number = 60 * 60 * 1000
    const now = new Date();
    return new Date(now.getTime() + hour);
  }

  getAuthheader() {
    let token: string = this.cookieService.get('token');
    return {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
  }

  setCookie(data: any) {
    //https://tkacz.pro/how-to-securely-store-jwt-tokens/
    this.cookieService.set('token', data.token, {
      secure: true,
      sameSite: 'Lax',
      //httpOnly: true
      expires: this.getExpirationDate()
    })
  }
}



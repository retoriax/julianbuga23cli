import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {loginrequest} from "../model/loginrequest";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  hide = true;
  error = false;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, private authService: AuthenticationService,private snackBar: MatSnackBar) {}

  //TODO COMMENT
  login(){
    const email = document.getElementById("loginEmail") as HTMLInputElement
    const password = document.getElementById("loginPassword") as HTMLInputElement
    const request : loginrequest = new loginrequest();
    request.email = email.value
    request.password = password.value

    let sbConfig = new MatSnackBarConfig();
    sbConfig.duration = 1000;
    sbConfig.verticalPosition = "top";
    sbConfig.horizontalPosition = "center"

    this.authService.login(request,(role: string) => {

      console.log("hier man " + role)
      switch (role) {
        case "no":{
          // falsche einloggdaten
          this.snackBar.open("Falsche Einlogdaten","",sbConfig)
          break
        }
        case  "ADMIN":{
          // navigate to admin panel
          console.log("ich leite dich weiter admin")
          this.router.navigate(['/admin/menu'])
          break
        }
        case "MANAGER": {
          // navigate to manager panel
          console.log("ich leite dich weiter manager")
          this.router.navigate(['/admin/menu'])
          break
        }
        case "TOBEACCEPTED": {
          // info tobeaccepted
          this.snackBar.open("Dein Account wurde noch nicht akzeptiert","",sbConfig)
          break
        }
        default: {
          // display error
          break
        }
      }
    });
  }
}

import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {loginrequest} from "../model/loginrequest";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

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
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  constructor(private router: Router, private authService: AuthenticationService) {

  }

  //TODO COMMENT
  login(){
    const email = document.getElementById("loginEmail") as HTMLInputElement
    const password = document.getElementById("loginPassword") as HTMLInputElement
    const request : loginrequest = new loginrequest();
    request.email = email.value
    request.password = password.value
    this.authService.login(request)
    console.log("Login triggered")

    this.authService.checkIfLoggedIn((success: boolean) => {
      if (success) {
        console.log("Du bist eingeloggt!");
        this.router.navigate(['/admin/menu'])
      } else {
        console.log("Du bist nicht eingeloggt.");
        //TODO: VISUAL RESPONSE REQUIRED
      }
    });

  }
}

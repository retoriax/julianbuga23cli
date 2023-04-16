import { Component } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RegisterRequest} from "../model/registerrequest";
import {AuthenticationService} from "../service/authentication.service";
import {BugapointServiceService} from "../service/bugapoint-service.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;
  hide = true;

  email = new FormControl('', [Validators.email]);
  vorname = new FormControl('');
  nachname = new FormControl('');
  password = new FormControl('');

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private _formBuilder: FormBuilder, private authService: AuthenticationService, private bugapoints: BugapointServiceService) {}

  createUser() {
    this.isLinear = true;
    let request = new RegisterRequest();
    request.firstname = this.vorname.value!;
    request.lastname = this.nachname.value!;
    request.email = this.email.value!;
    request.password = this.password.value!;
    console.log(request);
    this.authService.register(request);
  }
}

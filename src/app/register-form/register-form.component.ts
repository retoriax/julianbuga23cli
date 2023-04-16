import { Component } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UserService} from "../service/user-service.service";
import {User} from "../model/user";

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
  user: User;

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

  constructor(private _formBuilder: FormBuilder, private userService: UserService) {
    this.user = new User();
  }

  createUser() {
    this.isLinear = true;
    this.user.firstname = this.vorname.value!;
    this.user.lastname = this.nachname.value!;
    this.user.emailadress = this.email.value!;
    this.user.password = this.password.value!;
    console.log(this.user);
    this.userService.save(this.user);
  }
}

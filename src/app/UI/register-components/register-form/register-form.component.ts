import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../service/authentication.service';
import { RegisterRequest } from '../../../model/registerrequest';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isLinear = false;
  hide = true;
  @Output() userCreated = new EventEmitter<void>();

  email = new FormControl('', [Validators.required, Validators.email]);
  vorname = new FormControl('', Validators.required);
  nachname = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private _formBuilder: FormBuilder, private authService: AuthenticationService) {
    this.firstFormGroup = this._formBuilder.group({
      vorname: this.vorname,
    });
    this.fourthFormGroup = this._formBuilder.group({
      nachname: this.nachname
    })
    this.secondFormGroup = this._formBuilder.group({
      email: this.email
    });
    this.thirdFormGroup = this._formBuilder.group({
      password: this.password
    });
  }

  createUser() {
    let request = new RegisterRequest();
    request.firstname = this.vorname.value!;
    request.lastname = this.nachname.value!;
    request.email = this.email.value!;
    request.password = this.password.value!;
    console.log(request);
    this.authService.register(request);
    this.userCreated.emit();
  }

  isFormValid(): boolean {
    return this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid;
  }
}

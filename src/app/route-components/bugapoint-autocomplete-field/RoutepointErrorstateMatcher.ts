import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class RoutepointErrorstateMatcher implements ErrorStateMatcher {
  locationExists: boolean;
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return this.locationExists;
  }
  isValid() {
    this.locationExists = false;
  }
  isFalse() {
    this.locationExists = true;
  }
}

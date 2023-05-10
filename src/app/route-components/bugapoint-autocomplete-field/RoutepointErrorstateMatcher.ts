import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Can be called to indicate wrong Inputs in the
 */
export class RoutepointErrorstateMatcher implements ErrorStateMatcher {
  locationExists: boolean;
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return this.locationExists;
  }

  /**
   * Can be called to indicate a right input and reset the wrong input
   */
  isValid() {
    this.locationExists = false;
  }
  /**
   * Can be called to indicate false input
   */
  isFalse() {
    this.locationExists = true;
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-token-checker',
  templateUrl: './token-checker.component.html',
  styleUrls: ['./token-checker.component.css']
})
export class TokenCheckerComponent {
  @Output() valid = new EventEmitter<void>();

  tokenForm = new FormGroup({
    token: new FormControl('', Validators.required)
  });
  token: string

  checkToken() {
    const isTokenValid = true;

    if (isTokenValid) {
      this.valid.emit();
    }
  }
}

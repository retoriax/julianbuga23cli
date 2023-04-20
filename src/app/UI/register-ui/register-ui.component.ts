import { Component } from '@angular/core';

@Component({
  selector: 'app-register-ui',
  templateUrl: './register-ui.component.html',
  styleUrls: ['./register-ui.component.css']
})
export class RegisterUiComponent {
  isTokenValid = false;
  isUserCreated = false;

  onTokenValid() {
    this.isTokenValid = true;
  }

  onUserCreated() {
    this.isUserCreated = true;
  }
}

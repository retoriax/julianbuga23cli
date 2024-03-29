import {EventEmitter, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  navigationEvent = new EventEmitter<string>();
  constructor(private router: Router) { }

  /**
   * Method to navigate to a path and update the navbar.
   * @param path Path
   */
  navigate(path: string) {
    // Navigation logic here
    this.navigationEvent.emit(path);
    this.router.navigate([path]);
  }
}

import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-visitors-report-menu',
  templateUrl: './visitors-report-menu.component.html',
  styleUrls: ['./visitors-report-menu.component.css']
})
export class VisitorsReportMenuComponent {
  //FormControl
  titleForm = new FormControl('', [Validators.required])
  messageForm = new FormControl('', [Validators.required])

  save() {

  }
}

import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.css']
})
export class ReportCreateComponent {
  //FormControl
  titleForm = new FormControl('', [Validators.required])
  messageForm = new FormControl('', [Validators.required])
  discriminatorForm = new FormControl('', [Validators.required]);

  discriminators: Set<string>;
  startDate = new Date(2023, 5, 1);


}

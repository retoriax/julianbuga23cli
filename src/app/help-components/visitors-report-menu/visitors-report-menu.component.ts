import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Bugapoint} from "../../model/bugapoint";
import {mergeAll, Observable, startWith} from "rxjs";
import {BugapointService} from "../../services/bugapoint.service";
import {map} from "rxjs/operators";
import {Report} from "../../model/report";

interface Park {
  value: number | null;
  viewValue: string;
}

@Component({
  selector: 'app-visitors-report-menu',
  templateUrl: './visitors-report-menu.component.html',
  styleUrls: ['./visitors-report-menu.component.css']
})
export class VisitorsReportMenuComponent {

  //FormControl
  titleForm = new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])
  messageForm = new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])
  parkForm = new FormControl()
  myControl = new FormControl<string | Bugapoint>('');
  bugapoint: Bugapoint | undefined = undefined;
  filteredBugapoints: Observable<Bugapoint[]>;
  databaseBugapoints: Bugapoint[] = [];
  parks: Park[] = [
    {value: 0, viewValue : 'Luisenpark'},
    {value: 1, viewValue : 'Spinelli'},
    {value: null, viewValue : 'Keiner'},
  ];

  constructor(private bugapointservice: BugapointService) {}

  ngOnInit() {
    this.bugapointservice.findAll('orderBy=title').subscribe(
      (bugapoints: Bugapoint[]) => {
        this.databaseBugapoints = bugapoints;
      }
    );
    this.filteredBugapoints = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const title = typeof value === 'string' ? value : value?.title;
        return this.filterBugapoints(title as string);
      }),
      mergeAll()
    );
  }


  save() {
    grecaptcha.enterprise.ready(() => {
      grecaptcha.enterprise.execute('6LfSTFMmAAAAACzQrTDzhGpDdrUdy1MyI4XdM8av', {action: 'sendReport'}).then((token) => {
        console.log("Recaptcha erfolgreich")

        if (this.titleForm.value != null && this.messageForm.value !=null) {
          const report = new Report();
          report.title = this.titleForm.value;
          report.message = this.messageForm.value;
          report.bugapoint = this.bugapoint?.id ;
          report.adminEmail = undefined;
          report.discriminator = "Ticket";
          report.parkID = this.parkForm.value;
          console.log(report);
        }


      });
    });
  }

  isFormValid(): boolean {
    return this.titleForm.valid && this.messageForm.valid;
  }

  displayFn(bugapoint: Bugapoint): string {
    return bugapoint && bugapoint.title ? bugapoint.title : '';
  }

  filterBugapoints(searchTitle: string): Observable<Bugapoint[]> {
    const filteredBugapoints = this.databaseBugapoints.filter(bugapoint =>
      bugapoint.title.toLowerCase().includes(searchTitle.toLowerCase().trim())
    );
    return this.createObservable(filteredBugapoints);
  }
  createObservable(data: Bugapoint[]): Observable<Bugapoint[]> {
    return new Observable<Bugapoint[]>(observer => {
      observer.next(data);
      observer.complete();
    });
  }

}

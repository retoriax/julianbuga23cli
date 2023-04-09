import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
//import {map, startWith} from 'rxjs/operators';
import {BugapointServiceService} from "../service/bugapoint-service.service";
import {Bugapoint} from "../model/bugapoint";

@Component({
  selector: 'app-bugapoint-autocorrect-field',
  templateUrl: './bugapoint-autocorrect-field.component.html',
  styleUrls: ['./bugapoint-autocorrect-field.component.css']
})
export class BugapointAutocorrectFieldComponent implements OnInit{
  myControl = new FormControl('');
  bugapoints: Bugapoint[];
  filteredBugapoints: Observable<Bugapoint[]>;
  constructor(private bugapointservice: BugapointServiceService) {
  }

  ngOnInit() {
    this.bugapointservice.findAll().subscribe((data: Bugapoint[]) => {
      this.bugapoints = data;});
      /**
       this.filteredBugapoints = this.myControl.valueChanges.pipe(
       startWith(''),
       map(value => this._filter(value || '')),
       );
       */
  }
/**
  private _filter(value: string): Bugapoint[] {
    const filterValue = value.toLowerCase();

    return this.bugapoints.filter(bugapoint => bugapoint.title.toLowerCase().includes(filterValue));
  }
 */
}

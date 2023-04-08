import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-bugapoint-autocorrect-field',
  templateUrl: './bugapoint-autocorrect-field.component.html',
  styleUrls: ['./bugapoint-autocorrect-field.component.css']
})
export class BugapointAutocorrectFieldComponent implements OnInit{
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredBugapoints: Observable<string[]>;

  ngOnInit() {
    this.filteredBugapoints = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}

import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {BugapointServiceService} from "../service/bugapoint-service.service";
import {Bugapoint} from "../model/bugapoint";
import {RoutepointServiceService} from "../service/routepoint-service.service";

@Component({
  selector: 'app-bugapoint-autocorrect-field',
  templateUrl: './bugapoint-autocorrect-field.component.html',
  styleUrls: ['./bugapoint-autocorrect-field.component.css']
})
export class BugapointAutocorrectFieldComponent implements OnInit{
  myControl = new FormControl<string | Bugapoint>('');
  bugapoints: Bugapoint[]; //= [{"id" : "1","title" : "hurensohnPunkt", "longitude":40,"latitude":40},
    //{"id" : "1","title" : "fsd", "longitude":40,"latitude":40},{"id" : "1","title" : "dumm", "longitude":40,"latitude":40}];


  filteredBugapoints: Observable<Bugapoint[]>;
  newElement: Bugapoint;

 constructor(private bugapointservice: BugapointServiceService,
             private routeService: RoutepointServiceService) {
 }

  ngOnInit() {

    this.bugapointservice.findAll().subscribe((data: Bugapoint[]) => {
      this.bugapoints = data;});

    this.filteredBugapoints = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const title = typeof value === 'string' ? value : value?.title;
        return title ? this._filter(title as string) : this.bugapoints.slice();
      }),
    );
  }

  private _filter(name: string): Bugapoint[] {
    const filterValue = name.toLowerCase();

    return this.bugapoints.filter(bugapoint => bugapoint.title.toLowerCase().includes(filterValue));
  }
  displayFn(bugapoint: Bugapoint): string {
    return bugapoint && bugapoint.title ? bugapoint.title : '';
  }
  submit() {
    if (this.newElement && typeof this.newElement !== 'string') {
      let bugapoint = this.newElement;
      console.log(bugapoint);

    } else {
      //unhandled am besten irgendwie das Feld rot färben um invalid input anzuzeigen
    }
  }
}



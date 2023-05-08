import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BugapointlistComponent} from "../bugapointlist/bugapointlist.component";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-admin-components-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input()
  private list : BugapointlistComponent;

  @Output()
  private filterChanged = new EventEmitter<string>;


  changedTo(event: MatTabChangeEvent) {
    this.filterChanged.emit('' + Number(event.index + 1))
  }

  ngOnInit(): void {
    this.filterChanged.emit('' + 0)
  }

}

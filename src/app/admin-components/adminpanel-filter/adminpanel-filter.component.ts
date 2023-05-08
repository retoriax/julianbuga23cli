import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminpanelBugapointlistComponent} from "../adminpanel-bugapointlist/adminpanel-bugapointlist.component";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-admin-components-filter',
  templateUrl: './adminpanel-filter.component.html',
  styleUrls: ['./adminpanel-filter.component.css']
})
export class AdminpanelFilterComponent implements OnInit {

  @Input()
  private list : AdminpanelBugapointlistComponent;

  @Output()
  private filterChanged = new EventEmitter<string>;


  changedTo(event: MatTabChangeEvent) {
    this.filterChanged.emit('' + Number(event.index + 1))
  }

  ngOnInit(): void {
    this.filterChanged.emit('' + 0)
  }

}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AdminpanelBugapointlistComponent} from "../adminpanel-bugapointlist/adminpanel-bugapointlist.component";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-admin-components-filter',
  templateUrl: './adminpanel-filter.component.html',
  styleUrls: ['./adminpanel-filter.component.css']
})
export class AdminpanelFilterComponent {

  @Input()
  private list : AdminpanelBugapointlistComponent;

  @Output()
  private filterChanged = new EventEmitter<string>;

  luisenparkId = '1';
  spinelliparkId = '2';

  changedTo(event: MatTabChangeEvent) {
    console.log('INDEX: ' + event.index)
    this.filterChanged.emit('' + Number(event.index + 1))
  }

}

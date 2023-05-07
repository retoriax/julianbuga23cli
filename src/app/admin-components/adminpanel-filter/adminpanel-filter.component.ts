import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AdminpanelBugapointlistComponent} from "../adminpanel-bugapointlist/adminpanel-bugapointlist.component";

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

  changedTo(park: string) {
    console.log(park)
    this.filterChanged.emit(park)

  }
}

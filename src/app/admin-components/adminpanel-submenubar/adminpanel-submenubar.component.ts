import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-admin-components-submenubar',
  templateUrl: './adminpanel-submenubar.component.html',
  styleUrls: ['./adminpanel-submenubar.component.css']
})
export class AdminpanelSubmenubarComponent {
  @Input()
  title: string;

  @Input()
  backUrl: string;
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

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

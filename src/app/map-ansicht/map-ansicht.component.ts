import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-map-ansicht',
  templateUrl: './map-ansicht.component.html',
  styleUrls: ['./map-ansicht.component.css']
})
export class MapAnsichtComponent {
  @Output() ansichtOptionSelected = new EventEmitter<string>();

  selectedAnsichtOption = 'free-movement';
  showPopupFlag = false;

  showPopup() {
    this.showPopupFlag = !this.showPopupFlag;
  }

  onAnsichtOptionSelected() {
    this.ansichtOptionSelected.emit(this.selectedAnsichtOption);
  }
}

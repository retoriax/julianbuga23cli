import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-map-userlocation',
  templateUrl: './map-userlocation.component.html',
  styleUrls: ['./map-userlocation.component.css']
})
export class MapUserlocationComponent {

  @Output()
  onClickUserLocation = new EventEmitter

}

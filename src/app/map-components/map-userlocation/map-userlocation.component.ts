import {Component, EventEmitter, Output} from '@angular/core';
import {LatLng} from "leaflet";
import {Bugapoint} from "../../model/bugapoint";

@Component({
  selector: 'app-map-userlocation',
  templateUrl: './map-userlocation.component.html',
  styleUrls: ['./map-userlocation.component.css']
})
export class MapUserlocationComponent {

  @Output()
  userPositionEmitter = new EventEmitter<LatLng>

  setUserMarker() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPositionEmitter.emit(new LatLng(position.coords.latitude, position.coords.longitude))
      })
    }
  }
}

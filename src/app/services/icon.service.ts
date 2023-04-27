import { Injectable } from '@angular/core';
import * as L from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class IconService {
  iconsCache: { [key: string]: L.Icon } = {};
  constructor() { }

  getIconFromDiscriminator(discriminator: string): L.Icon {
    const iconUrl = `././assets/MapIcons/${discriminator}.png`;
    const defaultIconUrl = `././assets/MapIcons/Default.png`;

    if(!this.iconsCache[defaultIconUrl]) {
      const defaultIcon = L.icon({
        iconUrl: defaultIconUrl,
        iconSize: [32, 32],
      });
      this.iconsCache[defaultIconUrl] = defaultIcon;
    }
    if (this.iconsCache[iconUrl]) {
      return this.iconsCache[iconUrl];
    }

    if (this.fileExists(iconUrl)) {
      this.iconsCache[iconUrl] = L.icon({
        iconUrl: iconUrl,
        iconSize: [32, 32],
      });
    } else this.iconsCache[iconUrl] = this.iconsCache[defaultIconUrl];
    return this.iconsCache[iconUrl];
  }

  fileExists(url: string): boolean {
    let http = new XMLHttpRequest();
    http.open('GET', url, false);
    http.send();
    return !(http.response.toString().charAt(1) == "!" && http.response.toString().charAt(2) == "D" && http.response.toString().charAt(3) == "O");
  }
}

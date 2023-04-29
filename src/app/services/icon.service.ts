import { Injectable } from '@angular/core';
import * as L from "leaflet";
import {BugapointService} from "./bugapoint.service";

@Injectable({
  providedIn: 'root'
})
export class IconService {
  iconsCache: { [key: string]: L.Icon } = {};
  constructor( private bugapointService: BugapointService) {
    this.bugapointService.findAll().subscribe(bugapoints => {
      bugapoints.forEach((bugapoint) => {
        this.getIconFromDiscriminator(bugapoint.discriminator);
      })
    });

  }

  /**
   * Method to return an L.Icon for a given discriminator.
   * @param discriminator Discriminator
   */
  getIconFromDiscriminator(discriminator: string): L.Icon {
    const iconUrl = `././assets/MapIcons/${discriminator}.png`;
    const defaultIconUrl = `././assets/MapIcons/Default.png`;

    //Adds the default Icon to the cache
    if(!this.iconsCache[defaultIconUrl]) {
      const defaultIcon = L.icon({
        iconUrl: defaultIconUrl,
        iconSize: [32, 32],
      });
      this.iconsCache[defaultIconUrl] = defaultIcon;
    }
    //Return the icon if it is already in cache.
    if (this.iconsCache[iconUrl]) {
      return this.iconsCache[iconUrl];
    }
    //Return the icon if there is a matching file
    if (this.fileExists(iconUrl)) {
      this.iconsCache[iconUrl] = L.icon({
        iconUrl: iconUrl,
        iconSize: [32, 32],
      });
    } else this.iconsCache[iconUrl] = this.iconsCache[defaultIconUrl];
    return this.iconsCache[iconUrl];
  }

  /**
   * Method to check if a file exists and is not a html document.
   * @param url
   */
  fileExists(url: string): boolean {
    let http = new XMLHttpRequest();
    http.open('GET', url, false);
    http.send();
    return http.status != 404 && !(http.response.toString().charAt(1) == "!" && http.response.toString().charAt(2) == "D" && http.response.toString().charAt(3) == "O");
  }
}

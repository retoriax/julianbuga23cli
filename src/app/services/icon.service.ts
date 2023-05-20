import { Injectable } from '@angular/core';
import * as L from "leaflet";
import {BugapointService} from "./bugapoint.service";
import {icon} from "leaflet";



interface IconPicture {
  discriminator: string;
  src: string;
}

@Injectable({
  providedIn: 'root'
})
export class IconService {
  iconsCache: { [key: string]: L.Icon } = {};
  iconsPromises: { [key: string]: Promise<string> } = {};

  constructor( private bugapointService: BugapointService) {
    this.bugapointService.findAll().subscribe(bugapoints => {

      let alreadyIn = new Set;
      bugapoints.forEach((bugapoint) => {
        if (!alreadyIn.has(bugapoint.discriminator)){
          alreadyIn.add(bugapoint.discriminator);
          this.getIconFromDiscriminator(bugapoint.discriminator);
        }
      })
    });
  }

  /**
   * Method to return an L.Icon for a given discriminator.
   * @param discriminator Discriminator
   */
  async getIconFromDiscriminator(discriminator: string): Promise<L.Icon> {

    const iconUrl = `././assets/MapIcons/${discriminator.trim()}.png`;
    const defaultIconUrl = `././assets/MapIcons/Default.png`;


    //Adds the default Icon to the cache
    if(!this.iconsCache[defaultIconUrl]) {
      const defaultIcon = L.icon({
        iconUrl: defaultIconUrl,
        iconSize: [48, 48],
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
        iconUrl: await this.merge(iconUrl),
        iconSize: [48 , 48],
      });
    }
    else this.iconsCache[iconUrl] = this.iconsCache[defaultIconUrl];
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

  merge(url: string): Promise<string> {
    if (this.iconsPromises[url] !== undefined) {
      return this.iconsPromises[url];
    }
    return this.iconsPromises[url] = new Promise((resolve, reject) => {
      const backgroundImage = new Image();
      backgroundImage.src = '././assets/MapIcons/Background.png';
      backgroundImage.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = backgroundImage.width;
        canvas.height = backgroundImage.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
          const image1 = new Image();
          image1.src = url;
          image1.onload = () => {
            ctx.drawImage(image1, backgroundImage.width/2 - backgroundImage.width/4, backgroundImage.height/6, canvas.width/2, canvas.height/2);
            resolve(canvas.toDataURL("image/png"));
          };
          image1.onerror = (e) => {
            reject(e);
          };
        } else {
          reject(new Error("Could not get canvas context."));
        }
      };
      backgroundImage.onerror = (e) => {
        reject(e);
      };
    });
  }
}

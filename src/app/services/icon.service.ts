import {Injectable} from '@angular/core';
import * as L from "leaflet";
import {BugapointService} from "./bugapoint.service";


@Injectable({
  providedIn: 'root'
})
export class IconService {
  iconsCache: { [key: string]: L.Icon } = {};
  pictures: { [key: string]: Promise<string> } = {};
  fileExistsBooleans: { [key: string]: boolean } = {};

  constructor(private bugapointService: BugapointService) {
  }

  /**
   * Method to return an L.Icon for a given icon.
   * @param icon Discriminator
   */
  async getIcon(icon: string, background: string): Promise<L.Icon> {
    const defaultIconUrl = `././assets/MapIcons/Default.png`;

    //Adds the default Icon to the cache
    if (!this.iconsCache[defaultIconUrl]) {
      this.iconsCache[defaultIconUrl] = L.icon({
        iconUrl: defaultIconUrl,
        iconSize: [48, 48],
        iconAnchor: [20, 48],
        popupAnchor: [0, -48]
      });
    }
    //Return the icon if it is already in cache.
    if (this.iconsCache[icon + " " + background]) {
      return this.iconsCache[icon + " " + background];
    }
    //Return the icon if there is a matching file
    if (this.fileExists(`././assets/MapIcons/${icon.trim()}.png`)) {
      this.iconsCache[icon + " " + background] = L.icon({
        iconUrl: await this.getPicture(icon.trim(), background),
        iconSize: [48, 48],
        iconAnchor: [20, 48],
        popupAnchor: [0, -48]
      });
    } else this.iconsCache[icon + " " + background] = this.iconsCache[defaultIconUrl];
    return this.iconsCache[icon + " " + background];
  }

  /**
   * Method to check if a file exists and is not a html document.
   * @param url
   */
  fileExists(url: string): boolean {
    if (!this.fileExistsBooleans[url]) {
      let http = new XMLHttpRequest();
      http.open('GET', url, false);
      http.send();
      this.fileExistsBooleans[url] = http.status != 404 && !(http.response.toString().charAt(1) == "!" && http.response.toString().charAt(2) == "D" && http.response.toString().charAt(3) == "O");
    }
    return this.fileExistsBooleans[url];
  }

  getPicture(icon: string): Promise<string>;
  getPicture(icon: string, background: string): Promise<string>;
  getPicture(icon: string, background?: string): Promise<string> {
    if (background == undefined) {
      if (this.pictures[icon] !== undefined) {
        return this.pictures[icon];
      }
      if (this.fileExists(`././assets/MapIcons/${icon}.png`)) {
        return this.pictures[icon] = new Promise<string>((resolve, reject) => {
          const image = new Image();
          image.src = `././assets/MapIcons/${icon}.png`;
          image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
              resolve(canvas.toDataURL("image/png"))
            } else {
              reject(new Error("Could not get canvas context."));
            }
          }
          image.onerror = (e) => {
            reject(e);
          };
        })
      }
    }
    if (this.pictures[icon + " " + background] !== undefined) {
      return this.pictures[icon + " " + background];
    }
    return this.pictures[icon + " " + background] = new Promise((resolve, reject) => {
      const backgroundImage = new Image();
      backgroundImage.src = `././assets/MapIcons/Backgrounds/${background}.png`;
      backgroundImage.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = backgroundImage.width;
        canvas.height = backgroundImage.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
          const image1 = new Image();
          image1.src = `././assets/MapIcons/${icon}.png`;
          image1.onload = () => {
            ctx.drawImage(image1, backgroundImage.width / 2 - backgroundImage.width / 4, backgroundImage.height / 6, canvas.width / 2, canvas.height / 2);
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

export class Bugapoint {

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  id: number;
  adminID: number;
  parkID: number;
  title: string;
  longitude: number;
  latitude : number;
  discriminator: string;
  description: string;
}

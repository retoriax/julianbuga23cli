export class Bugapoint {

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  id: string;
  adminId: number;
  title: string;
  longitude: number;
  latitude : number;
  discriminator: string;
}

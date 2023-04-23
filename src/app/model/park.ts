export class Park {


  constructor(title: string, latitude: number, longitude: number) {
    this.title = title;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  id: number;
  title: string;
  latitude: number;
  longitude: number;

}

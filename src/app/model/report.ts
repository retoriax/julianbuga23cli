import {Bugapoint} from "./bugapoint";

export class Report {

  constructor() {}

  id: number;
  adminEmail: string | undefined;
  parkID: number | undefined;
  title: string;
  discriminator: string;
  bugapoint: number;
  message: string;
}

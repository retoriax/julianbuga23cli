import {Bugapoint} from "./bugapoint";

export class Report {

  constructor() {}

  id: number;
  adminEmail: string | undefined;
  parkID: string | null;
  title: string;
  discriminator: string;
  bugapoint: number | undefined;
  message: string;
}

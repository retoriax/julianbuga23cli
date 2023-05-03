import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-adminpanel-savedialog',
  templateUrl: './adminpanel-savedialog.component.html',
  styleUrls: ['./adminpanel-savedialog.component.css']
})
export class AdminpanelSavedialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }
}

import {Component, Inject} from '@angular/core';
import {Bugapoint} from "../../../model/bugapoint";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


export interface DeleteDialogData {
  bugapoint: Bugapoint
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) {
  }

  onNotSure() {
    this.dialogRef.close(false)
  }

  onSure() {
    this.dialogRef.close(true)
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { successModel } from "./successModel";
@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  successModel: successModel;
  constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.successModel = data;
  }

  ngOnInit(): void {
  }


  finish() {
    this.dialogRef.close();
   // window.location.replace('http://localhost:4200/');
  }
}

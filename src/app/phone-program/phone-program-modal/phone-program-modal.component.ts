import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-phone-program-modal',
  templateUrl: './phone-program-modal.component.html',
  styleUrls: ['./phone-program-modal.component.css']
})
export class PhoneProgramModalComponent implements OnInit {

  requestsList: string[] = ['test item 1', 'test item 2', 'test item 3', 'test item 4']
  constructor(public dialogRef: MatDialogRef<PhoneProgramModalComponent>) { }

  ngOnInit(): void {
  }

  cancelButton() {
    this.dialogRef.close();

  }
}

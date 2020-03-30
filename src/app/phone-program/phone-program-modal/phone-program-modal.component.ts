import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
@Component({
  selector: 'app-phone-program-modal',
  templateUrl: './phone-program-modal.component.html',
  styleUrls: ['./phone-program-modal.component.css']
})
export class PhoneProgramModalComponent implements OnInit {

  requestsList: string[] = ['Handset']
  constructor(public dialogRef: MatDialogRef<PhoneProgramModalComponent>, private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  cancelButton() {
    this.dialogRef.close();

  }
  submitButton() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { header: "Submitted Request", paragraph: "Your request is submitted successfully.You can track your request from track section" };
    this.matDialog.open(SuccessDialogComponent, dialogConfig);
  }
}

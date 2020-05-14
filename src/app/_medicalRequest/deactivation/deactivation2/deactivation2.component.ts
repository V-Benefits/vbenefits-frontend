import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-deactivation2',
  templateUrl: './deactivation2.component.html',
  styleUrls: ['./deactivation2.component.css']
})
export class Deactivation2Component implements OnInit {

  constructor(public dialogRef: MatDialogRef<Deactivation2Component>,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  closeDialog()
{
  this.dialogRef.close();

}
  Deactivate()
  {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { header: "Submitted Request", paragraph: "Your request is submitted successfully.You can track your request from track section" };
    this.matDialog.open(SuccessDialogComponent, dialogConfig);
  }

}

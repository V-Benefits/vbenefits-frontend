import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
import { PhoneProgramModalComponent } from './phone-program-modal/phone-program-modal.component';
@Component({
  selector: 'app-phone-program',
  templateUrl: './phone-program.component.html',
  styleUrls: ['./phone-program.component.css']
})
export class PhoneProgramComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }
  makeRequest() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { header: "Submitted Request", paragraph: "Your request is submitted successfully.You can track your request from track section" };
    this.matDialog.open(SuccessDialogComponent, dialogConfig);
  }

  FAQ() {
    this.matDialog.open(PhoneProgramModalComponent);
  }
}
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

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
    this.matDialog.open(SuccessDialogComponent, dialogConfig);
  }
}

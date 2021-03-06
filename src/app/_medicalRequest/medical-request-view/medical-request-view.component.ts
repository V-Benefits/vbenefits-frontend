import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MedicalRequestModalComponent } from './medical-request-modal/medical-request-modal.component';
import { Deactivation1Component } from '../deactivation/deactivation1/deactivation1.component';

@Component({
  selector: 'app-medical-request-view',
  templateUrl: './medical-request-view.component.html',
  styleUrls: ['./medical-request-view.component.css']
})
export class MedicalRequestViewComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    // dialogConfig.data = this.pensionRequestModel;
    this.dialog.open(MedicalRequestModalComponent, dialogConfig);
  }

  deactivate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "477px";
    this.dialog.open(Deactivation1Component, dialogConfig);
  }
}

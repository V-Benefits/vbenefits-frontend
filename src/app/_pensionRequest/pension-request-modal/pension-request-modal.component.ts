import { Component, OnInit, Inject } from '@angular/core';
import { PhoneProgramModalComponent } from 'src/app/phone-program/phone-program-modal/phone-program-modal.component';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';
import { publicService } from 'src/app/core/publicService.service';
import { CreatePensionRequestModel } from '../models/pensionModel';
@Component({
  selector: 'app-pension-request-modal',
  templateUrl: './pension-request-modal.component.html',
  styleUrls: ['./pension-request-modal.component.css']
})
export class PensionRequestModalComponent implements OnInit {

  CreatePensionRequestModel: CreatePensionRequestModel = new CreatePensionRequestModel();

  constructor(
    public dialogRef: MatDialogRef<PhoneProgramModalComponent>,
    private matDialog: MatDialog,
    private service: publicService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    //   this.CreatePensionRequestModel = data;
    this.CreatePensionRequestModel.BeginingBalance = 10;
    this.CreatePensionRequestModel.CurrentyearContribution = 30;
    this.CreatePensionRequestModel.VestingPercent = 40;
    this.CreatePensionRequestModel.LastRoundWithdrawal = 60;
    this.CreatePensionRequestModel.ProratedNewContribution = 90;
    this.CreatePensionRequestModel.CurrentAvailableBalance = 90;

    this.CreatePensionRequestModel.MaxWithdrawalAmount = 20;
    this.CreatePensionRequestModel.YearsOfService = 4;

    this.CreatePensionRequestModel.RequestedById = 4;
    this.CreatePensionRequestModel.RequestedOn = new Date();
    this.CreatePensionRequestModel.isActive = true;
    this.CreatePensionRequestModel.isApproved = true;
    this.CreatePensionRequestModel.ApprovedOn = new Date();
    this.CreatePensionRequestModel.RejectedOn = new Date();
  }

  ngOnInit(): void {
  }

  saveButton() {
    this.requestPension();
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { header: "Submitted Request", paragraph: "Your request is submitted successfully.You can track your request from track section" };
    this.matDialog.open(SuccessDialogComponent, dialogConfig);
  }

  requestPension() {
    this.service.post(this.CreatePensionRequestModel, 'PensionRequest').subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

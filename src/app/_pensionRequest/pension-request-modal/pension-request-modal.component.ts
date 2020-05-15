import { Component, OnInit, Inject } from '@angular/core';
import { PhoneProgramModalComponent } from 'src/app/phone-program/phone-program-modal/phone-program-modal.component';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';
import { publicService } from 'src/app/core/publicService.service';
import { CreatePensionRequestModel } from '../models/pensionModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pension-request-modal',
  templateUrl: './pension-request-modal.component.html',
  styleUrls: ['./pension-request-modal.component.css']
})
export class PensionRequestModalComponent implements OnInit {

  CreatePensionRequestModel: CreatePensionRequestModel = new CreatePensionRequestModel();
  disableBtn: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PensionRequestModalComponent>,
    private matDialog: MatDialog,
    private service: publicService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.CreatePensionRequestModel = data;
    console.log(this.CreatePensionRequestModel, "&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  }

  ngOnInit(): void {
    this.CreatePensionRequestModel.withdrawalAmmount = null;
  }

  saveButton() {
    this.requestPension();
  }

  requestPension() {
    if (+this.CreatePensionRequestModel.withdrawalAmmount > +this.CreatePensionRequestModel.maxWithdrawalAmount) {
      this.disableBtn = true;
    }
    else {
      this.disableBtn = false;
      this.CreatePensionRequestModel.withdrawalAmmount = + this.CreatePensionRequestModel.withdrawalAmmount;
      console.log(this.CreatePensionRequestModel, "^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

      this.service.post(this.CreatePensionRequestModel, 'PensionRequest').subscribe(
        res => {
          console.log(res);
          this.openSuccessDialog();
          localStorage.setItem('IsUserEligible', 'true');
          console.log(localStorage.getItem('IsUserEligible'), "local storage --------------");
        },
        error => {
          console.log(error);
        }
      );
    }


  }

  closeDialog() {
    this.dialogRef.close();
  }

  openSuccessDialog() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { header: "Submitted Request", paragraph: "Your request is submitted successfully.You can track your request from track section" };
    this.matDialog.open(SuccessDialogComponent, dialogConfig);
    //  window.location.reload();
  }

  checkMaxWithdrawalAmmount($event) {
    console.log(+$event.target.value, "##################event #####################",
      +this.CreatePensionRequestModel.maxWithdrawalAmount);
    if (+ $event.target.value > +this.CreatePensionRequestModel.maxWithdrawalAmount) {
      this.disableBtn = true;
    }
    else {
      this.disableBtn = false;
    }
  }
}

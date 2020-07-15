import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UserViewInfoModel } from '../../Models/userViewInfoModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { publicService } from 'src/app/core/publicService.service';
import { SuccessDialogComponent } from '../../../shared/success-dialog/success-dialog.component'
@Component({
  selector: 'app-update-pension-policy-and-dates',
  templateUrl: './update-pension-policy-and-dates.component.html',
  styleUrls: ['./update-pension-policy-and-dates.component.css']
})
export class UpdatePensionPolicyAndDatesComponent implements OnInit {

  UserViewInfoObject: UserViewInfoModel = new UserViewInfoModel();
  UserViewInfoFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdatePensionPolicyAndDatesComponent>,
    private formBuilder: FormBuilder,
    private service: publicService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.UserViewInfoFormGroup = this.formBuilder.group({

      round1: [{ begin: new Date(2020, 7, 5), end: new Date(2020, 7, 25) }],
      round2: [{ begin: new Date(2020, 7, 5), end: new Date(2020, 7, 25) }],
      policyURL: ['', Validators.required],
      policyFilePath: ['', Validators.required],
    });
  }
  UpdatePensionUserView() {
    debugger;

    this.UserViewInfoObject.firstRoundStartDate = this.UserViewInfoFormGroup.controls['round1'].value.begin;;
    this.UserViewInfoObject.firstRoundEndDate = this.UserViewInfoFormGroup.controls['round1'].value.end;
    this.UserViewInfoObject.secondRoundStartDate = this.UserViewInfoFormGroup.controls['round2'].value.begin;
    this.UserViewInfoObject.secondRoundEndDate = this.UserViewInfoFormGroup.controls['round2'].value.end;

    this.UserViewInfoObject.policyURL = this.UserViewInfoFormGroup.controls['policyURL'].value;
    this.UserViewInfoObject.policyFilePath = this.UserViewInfoFormGroup.controls['policyFilePath'].value;


    this.service.post(this.UserViewInfoObject, 'PensionRequest', 'UpdatePolicyAndRoundDates').subscribe(
      res => {
        this.dialogRef.close();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { header: "Update Completed Successfully", paragraph: "" };
        this.matDialog.open(SuccessDialogComponent, dialogConfig);

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

import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
import { PhoneProgramRequestModel } from 'src/app/_profileInformation/profileInformationModels/createProfileInformation';
import { publicService } from 'src/app/core/publicService.service';
import { AuthService } from 'src/app/core/auth.service';
@Component({
  selector: 'app-phone-program-modal',
  templateUrl: './phone-program-modal.component.html',
  styleUrls: ['./phone-program-modal.component.css']
})
export class PhoneProgramModalComponent implements OnInit {
  PhoneProgramRequestModel: PhoneProgramRequestModel = new PhoneProgramRequestModel();
   requestsList: string[] = ['Handset'];

  constructor(public dialogRef: MatDialogRef<PhoneProgramModalComponent>,
    private matDialog: MatDialog,
    private service: publicService,
    private authService: AuthService, ) { }

  ngOnInit(): void {
  }

  cancelButton() {
    this.dialogRef.close();
  }
  submitButton() {
    this.requestPhoneProgram();
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { header: "Submitted Request", paragraph: "Your request is submitted successfully.You can track your request from track section" };
    this.matDialog.open(SuccessDialogComponent, dialogConfig);
  }

  requestPhoneProgram() {
    this.PhoneProgramRequestModel.RequestById = +localStorage.getItem('Id');
    this.PhoneProgramRequestModel.RequestDate = new Date();
    this.service.post(this.PhoneProgramRequestModel, 'PhoneProgramRequest').subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }


  private getUserId() {
    debugger
    let token = this.authService.decode();
    return token._id;
  }
}

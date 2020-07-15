import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CreateProfileInformationModel } from '../profileInformationModels/createProfileInformation';
import { publicService } from 'src/app/core/publicService.service';
import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { debug } from 'console';


@Component({
  selector: 'app-profile-information-dialog',
  templateUrl: './profile-information-dialog.component.html',
  styleUrls: ['./profile-information-dialog.component.css']
})
export class ProfileInformationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProfileInformationDialogComponent>,
    private formBuilder: FormBuilder,
    private service: publicService,
    private matDialog: MatDialog
  ) { }

  profileInformationObject: CreateProfileInformationModel = new CreateProfileInformationModel();
  createProfileInformationFormGroup: FormGroup;

  // staffIdCtrl = new FormControl('primary', Validators.required);
  staffIdCtrl: any;
  dateOfBirthCtrl: any;
  nationalIdCtrl: any;
  mobileNumberCtrl: any;
  landlineNumberCtrl: any;
  // staffIdCtrl = this.createProfileInformationFormGroup.controls['staffId'];
  // dateOfBirthCtrl = this.createProfileInformationFormGroup.controls['dateOfBirth'];
  // nationalIdCtrl = this.createProfileInformationFormGroup.controls['nationalId'];
  // mobileNumberCtrl = this.createProfileInformationFormGroup.controls['mobileNumber'];
  // landlineNumberCtrl = this.createProfileInformationFormGroup.controls['landlineNumber'];

  ngOnInit(): void {
    this.createProfileInformationFormGroup = this.formBuilder.group({
      staffId: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationalId: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      landlineNumber: ['', Validators.required],
    });
  }

  bindingFormControls() {
    this.staffIdCtrl = this.createProfileInformationFormGroup.controls['staffId'];
    this.dateOfBirthCtrl = this.createProfileInformationFormGroup.controls['dateOfBirth'];
    // this.dateOfBirthCtrl = '2020-03-27T13:29:18.547Z';
    this.nationalIdCtrl = this.createProfileInformationFormGroup.controls['nationalId'];
    this.mobileNumberCtrl = this.createProfileInformationFormGroup.controls['mobileNumber'];
    this.landlineNumberCtrl = this.createProfileInformationFormGroup.controls['landlineNumber'];
  }


  addProfileInformation() {
    // bindingControls
    this.bindingFormControls();

    this.profileInformationObject.StaffId = this.staffIdCtrl.value;
    // this.profileInformationObject.StaffId = this.createProfileInformationFormGroup.controls['staffId'].value;
    debugger;
    var x = this.dateOfBirthCtrl.value;
    this.profileInformationObject.DateOfBirth = this.dateOfBirthCtrl.value;
    this.profileInformationObject.NationalId = this.nationalIdCtrl.value;
    this.profileInformationObject.MobileNumber = this.mobileNumberCtrl.value;
    this.profileInformationObject.LandlineNumber = this.landlineNumberCtrl.value;
    console.log(this.profileInformationObject);
    this.service.post(this.profileInformationObject, 'Employees').subscribe(
      res => {
        //Here we can use the response data
        // debugger;

        console.log(res);

        localStorage.setItem('StaffId', res.staffId);
        localStorage.setItem('Id', res.id);
        console.log(localStorage.getItem('Id'));

      },
      error => {
        console.log(error);

      }
    );
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { header: "Verification Complete", paragraph: "You can change your information from profile" };
    this.matDialog.open(SuccessDialogComponent, dialogConfig);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { publicService } from 'src/app/core/publicService.service';
import { ViewEncapsulation } from '@angular/compiler/src/compiler_facade_interface';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';
import { ImageModel } from '../../models/imageModel';
import { MedicalRequestForEmployeeModel } from '../../models/medicalRequestForEmployeeModel';
import { MedicalRequestForSpouseModel } from '../../models/medicalRequestForSpouseModel';
import { MedicalRequestForChildModel } from '../../models/medicalRequestForChildModel';

@Component({
  selector: 'app-medical-request-modal',
  templateUrl: './medical-request-modal.component.html',
  styleUrls: ['./medical-request-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicalRequestModalComponent implements OnInit {
  cardTypeList: string[] = ['New card', 'Replacement for lost one'];
  requestForList: string[] = ['Myself', 'Children', 'Spouse'];
  requestFor: string = "";
  cardType: string = "";

  marriageCertificateImage: ImageModel = new ImageModel();
  personalImage: ImageModel = new ImageModel();
  maxImageSize: number = 55500;      // to be changed 
  Errormessage: string;

  medicalRequestForEmployeeModel: MedicalRequestForEmployeeModel = new MedicalRequestForEmployeeModel();
  medicalRequestForSpouseModel: MedicalRequestForSpouseModel = new MedicalRequestForSpouseModel();
  medicalRequestForChildModelArray: MedicalRequestForChildModel[];
  childrenCount = 1;
  array = Array;

  // imageName: string;
  // public imagePath: File;
  // displayUploadImage: boolean = false;
  // imgURL: any;


  constructor(public dialogRef: MatDialogRef<MedicalRequestModalComponent>,
    private matDialog: MatDialog,
    private service: publicService) { }

  ngOnInit(): void {
    // set the staffid in objects to the loggedin user staffId
    this.medicalRequestForChildModelArray = [];
  }

  test() {
    debugger;
    var x = this.childrenCount;
  }
  onRequestSelection(value) {
    this.requestFor = value;
  }

  preview(files, imageType) {

    if (files.length === 0)
      return;

    // var mimeSize = files[0].size;
    // if (mimeSize > this.maxImageSize) {
    //   this.Errormessage = `Max Image Size should be ${this.maxImageSize}`;
    //   return;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      if (imageType == "Personal") {
        this.personalImage.url = reader.result;
        this.personalImage.name = files[0].name;
      }
      else if (imageType == "spouse") {
        this.marriageCertificateImage.url = reader.result;
        this.marriageCertificateImage.name = files[0].name;
      }
    }
  }

  deleteImg(imageType) {
    if (imageType == "spouse") {
      this.marriageCertificateImage.name = '';
      this.marriageCertificateImage.url = '';
    }

    else if (imageType == "Personal") {
      this.personalImage.name = '';
      this.personalImage.url = '';
    }
    // console.log(this.imagePath, "&&&&&&&&&&&&&&");
  }

  saveButton() {
    debugger;
    if (this.requestFor == "Myself" && this.cardType == "New card") {
      this.medicalRequestForEmployeeModel.personalImage = this.personalImage.url;
      this.service.post(this.medicalRequestForEmployeeModel, 'MedicalRequest', 'AddMedicalCardRequestForEmployee').subscribe(
        res => {
          console.log(res);
          this.openSuccessDialog();
        },
        error => {
          console.log(error);
        }
      );
    }
    else if (this.requestFor == "Spouse" && this.cardType == "New card") {

      this.service.post(this.medicalRequestForSpouseModel, 'MedicalRequest', 'AddMedicalCardRequestForSpouse').subscribe(
        res => {
          console.log(res);
          this.openSuccessDialog();
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
  }

}

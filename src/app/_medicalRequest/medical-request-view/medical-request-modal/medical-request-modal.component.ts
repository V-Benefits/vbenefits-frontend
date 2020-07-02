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
  childPersonalImage: ImageModel = new ImageModel();
  childBirthCertificate: ImageModel = new ImageModel();
  maxImageSize: number = 55500;      // to be changed 
  Errormessage: string;


  medicalRequestForEmployeeModel: MedicalRequestForEmployeeModel = new MedicalRequestForEmployeeModel();
  medicalRequestForSpouseModel: MedicalRequestForSpouseModel = new MedicalRequestForSpouseModel();
  // medicalRequestForChildModelArray: MedicalRequestForChildModel[];
  childArray: MedicalRequestForChildModel[];
  childrenCount = 1;
  array = Array;

  BirthCertificates: ImageModel[] = [];
  childImages: ImageModel[] = [];

  constructor(public dialogRef: MatDialogRef<MedicalRequestModalComponent>,
    private matDialog: MatDialog,
    private service: publicService) { }

  ngOnInit(): void {
    // set the staffid in objects to the loggedin user staffId
    // this.medicalRequestForChildModelArray = [];
    this.childArray = [];
    this.BirthCertificates = []
  }

  onRequestSelection(value) {
    this.requestFor = value;
  }

  previewChildImages(files, i, type) {
    let imageModelChild = new ImageModel();
    if (files.length === 0)
      return;

    // var mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.Errormessage = "Only images are supported.";
    //   return;
    // }
    // var mimeSize = files[0].size;
    // if (mimeSize > this.maxImageSize) {
    //   this.Errormessage = `Max Image Size should be ${this.maxImageSize}`;
    //   return;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      imageModelChild.url = reader.result;
      imageModelChild.name = files[0].name
      if (type == "birthCertificate")
        this.BirthCertificates[i] = imageModelChild;
      else
        this.childImages[i] = imageModelChild;
    }
  }
  // previewChildImages(files, i) {
  //   let imageModelChild = new ImageModel();
  //   if (files.length === 0)
  //     return;

  //   // var mimeType = files[0].type;
  //   // if (mimeType.match(/image\/*/) == null) {
  //   //   this.Errormessage = "Only images are supported.";
  //   //   return;
  //   // }
  //   // var mimeSize = files[0].size;
  //   // if (mimeSize > this.maxImageSize) {
  //   //   this.Errormessage = `Max Image Size should be ${this.maxImageSize}`;
  //   //   return;
  //   // }

  //   var reader = new FileReader();
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {


  //     imageModelChild.url = reader.result;
  //     imageModelChild.name = files[0].name
  //     this.BirthCertificates[i] = imageModelChild;
  //   }
  //   console.log(this.BirthCertificates, "&&&&&&&&&&&");
  // }

  deleteChildImg(imageName, i) {
    this.childArray[i] = null;
    imageName == "Certificate" ? this.BirthCertificates[i] = null : this.childImages[i] = null;
    //  imageName == "Certificate" ? this.childBirthCertificate = new ImageModel() : this.childPersonalImage = new ImageModel()
  }

  dataChanged(event, i, type) {
    if (type === 'childImage')
      this.childArray[i] = Object.assign(this.childArray[i] || {}, { childImage: event })
    if (type === 'birthCertificate')
      this.childArray[i] = Object.assign(this.childArray[i] || {}, { birthCertificate: event })
    if (type === 'childName')
      this.childArray[i] = Object.assign(this.childArray[i] || {}, { childName: event })
    console.log(this.childArray, "***********************");
  }















  preview(files, imageType) {
    debugger
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
      else if (imageType == "Children") {
        this.childPersonalImage.url = reader.result;
        this.childPersonalImage.name = files[0].name;
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

    else if (imageType == "Children") {
      this.childPersonalImage.name = '';
      this.childPersonalImage.url = '';
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

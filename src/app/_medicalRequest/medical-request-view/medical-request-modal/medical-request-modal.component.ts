import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { publicService } from 'src/app/core/publicService.service';
import { ViewEncapsulation } from '@angular/compiler/src/compiler_facade_interface';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';
import { ImageModel } from '../../models/imageModel';
import { MedicalRequestForChildModel, MedicalRequestModel } from '../../models/medicalRequestForChildModel';

@Component({
  selector: 'app-medical-request-modal',
  templateUrl: './medical-request-modal.component.html',
  styleUrls: ['./medical-request-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicalRequestModalComponent implements OnInit {
  cardTypeList: string[] = ['New card', 'Replacement for lost one'];
  requestForList: string[] = ['Myself', 'Children', 'Spouse'];

  medicalRequestModel: MedicalRequestModel = new MedicalRequestModel();
  childArray: MedicalRequestForChildModel[] = [];
  BirthCertificates: ImageModel[] = [];
  childImages: ImageModel[] = [];

  marriageCertificateImage: ImageModel = new ImageModel();
  personalImage: ImageModel = new ImageModel();

  array = Array;
  userStaffId: number;
  childrenCount = 0;
  requestFor: string = "";
  cardType: string = "";
  spouseName: string = '';
  labelTitle: string;
  maxImageSize: number = 55500;      // to be changed 
  Errormessage: string;

  constructor(public dialogRef: MatDialogRef<MedicalRequestModalComponent>,
    private matDialog: MatDialog,
    private service: publicService) { }

  ngOnInit(): void {
    // set the staffid in objects to the loggedin user staffId
    this.userStaffId = +localStorage.getItem('StaffId');
  }

  onRequestSelection(value) {
    this.requestFor = value;
    this.personalImage = new ImageModel();
    this.medicalRequestModel = new MedicalRequestModel();
    value == "Myself" ? this.labelTitle = 'Personal Image' : this.labelTitle = 'Spouse Image';
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
      this.marriageCertificateImage.url = '';
      this.marriageCertificateImage.name = ''
    }
    else {
      this.personalImage.name = '';
      this.personalImage.url = ''
    }
    // imageType == "spouse" ? this.marriageCertificateImage = null : this.personalImage = new ImageModel();
  }

  saveButton() {
    this.fillMedicalRequestModel();
    console.log(this.medicalRequestModel, "------------model-----------------------");

    this.service.post(this.medicalRequestModel, 'MedicalRequest', 'AddMedicalCardRequest').subscribe(
      res => {
        console.log(res);
        this.openSuccessDialog();
      },
      error => {
        console.log(error);
      }
    );
  }

  fillMedicalRequestModel() {
    this.medicalRequestModel.staffId = this.userStaffId;
    this.medicalRequestModel.requestType = this.requestFor;
    this.medicalRequestModel.spouseName = this.spouseName;
    this.requestFor == 'Myself' ? this.medicalRequestModel.personalImage = this.personalImage.url : this.medicalRequestModel.personalImage = null;
    this.requestFor == 'Spouse' ? this.medicalRequestModel.spouseImage = this.personalImage.url : this.medicalRequestModel.spouseImage = null;

    this.medicalRequestModel.marrigeCertificate = this.marriageCertificateImage.url;
    this.medicalRequestModel.childrenNumber = this.childrenCount;
    this.medicalRequestModel.childrenInfoDTOs = this.childArray;
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

import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { publicService } from 'src/app/core/publicService.service';
import { ViewEncapsulation } from '@angular/compiler/src/compiler_facade_interface';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';
import { ImageModel } from '../../models/imageModel';
@Component({
  selector: 'app-medical-request-modal',
  templateUrl: './medical-request-modal.component.html',
  styleUrls: ['./medical-request-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicalRequestModalComponent implements OnInit {
  seasons: string[] = ['New card', 'Replacement for lost one'];
  requestForList: string[] = ['Myself', 'Children', 'Spouse'];
  public imagePath: File;
  imgURL: any;
  message: string;
  imageName: string;
  marriageCertificateImageURL: any;
  marriageCertificateImage: ImageModel = new ImageModel();
  personalImage: ImageModel = new ImageModel();

  displayUploadImage: boolean = false;
  requestFor: string = "";
  cardType: string = "";

  maxImageSize: number = 55500;      // to be changed 

  constructor(public dialogRef: MatDialogRef<MedicalRequestModalComponent>,
    private matDialog: MatDialog,
    private service: publicService) { }

  ngOnInit(): void {
  }

  onRequestSelection(value) {
    this.requestFor = value;
  }

  // onCardTypeSelection(value) {
  //   debugger;
  //   this.cardType = value;

  // }


  preview(files, imageType) {

    console.log(files.type, "&&&&&&&&&&&&&&");
    debugger;
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    var mimeSize = files[0].size;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    if (mimeSize > this.maxImageSize) {
      this.message = `Max Image Size should be ${this.maxImageSize}`;
      return;
    }

    //this.imageName = files[0].name;
    var reader = new FileReader();
    this.imagePath = files;
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
    console.log(this.imagePath, "&&&&&&&&&&&&&&");
  }

  saveButton() {
    this.openSuccessDialog()
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

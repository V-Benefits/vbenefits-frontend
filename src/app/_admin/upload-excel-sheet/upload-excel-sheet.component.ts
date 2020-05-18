import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { publicService } from 'src/app/core/publicService.service';
import * as XLSX from 'xlsx';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-upload-excel-sheet',
  templateUrl: './upload-excel-sheet.component.html',
  styleUrls: ['./upload-excel-sheet.component.css']
})
export class UploadExcelSheetComponent implements OnInit {

  constructor(private publicService: publicService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onFileChange(ev) {
    debugger;
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      debugger
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        // this.publicService.post(initial, 'account', 'bulkRegister').subscribe(res => {
        //   this._snackBar.openFromComponent(SnackBarComponent, {
        //     data: 'Data inserted successfully',
        //     panelClass: 'snackbar',
        //     duration: 10000
        //   });
        //   console.log('resonse of api ', res);
        // })
        console.log(initial);
        return initial;
      }, {});
    }


    reader.readAsBinaryString(file);
  }
}

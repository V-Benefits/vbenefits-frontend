import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { MatTableDataSource, MatSortModule, MatSort, Sort, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PensionRequestModel } from 'src/app/_admin/Models/pensionRequestModel';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-pension-view',
  templateUrl: './pension-view.component.html',
  styleUrls: ['./pension-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PensionViewComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  all = true;
  approved = false;
  rejected = false;
  canceled = false;

  pensionRequestList: PensionRequestModel[];
  pensionFilteredList: PensionRequestModel[];
  countOfApprovedRequests: number;
  countOfCanceledRequests: number;

  displayedColumns: string[] = ['first', 'second', 'id', 'name', 'begining balance', 'contribution', 'available balance', 'withdrawn', 'status', 'actions'];
  dataSource = new MatTableDataSource<PensionRequestModel>(this.pensionRequestList);
  selection = new SelectionModel<PensionRequestModel>(true, []);

  constructor(
    private service: publicService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getPensionListData();
    this.dataSource.paginator = this.paginator;
  }

  filterAll() {
    this.approved = false;
    this.all = true;
    this.canceled = false;
    this.dataSource.data = this.pensionRequestList;
  }

  filterApproved() {
    this.approved = true;
    this.all = false;
    this.canceled = false;
    this.pensionFilteredList = this.pensionRequestList.filter(function (el) {
      return el.status == "Approved";
    });

    this.dataSource.data = this.pensionFilteredList;
  }

  filterCanceled() {
    this.all = false;
    this.approved = false;
    this.canceled = true;
    this.pensionFilteredList = this.pensionRequestList.filter(function (el) {
      return el.status == "Canceled";
    });

    this.dataSource.data = this.pensionFilteredList;
  }

  getAllData() {
    // DB_DATA = database
    // this.ELEMENT_DATA = DB_DATA;
  }

  getPensionListData() {
    this.service.getAll('PensionRequest/GetAllPensionRequests').subscribe(
      res => {
        this.pensionRequestList = res;
        this.dataSource.data = this.pensionRequestList;

        this.getCountOfApprovedAndCanceledRequests(this.pensionRequestList);
        console.log('getallpension res list--> ', this.pensionRequestList);
      },
      err => {
        console.log('getallpension error -->', err);
      }
    );
  }

  getCountOfApprovedAndCanceledRequests(pensionRequestList: PensionRequestModel[]) {
    this.countOfApprovedRequests = pensionRequestList.filter(request => request.status == "Approved").length;
    this.countOfCanceledRequests = pensionRequestList.filter(request => request.status == "Canceled").length;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PensionRequestModel) {
    // if (!row) {
    //   return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    // }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {

      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        this.service.post(initial.Sheet1, 'MetlifeData').subscribe(res => {
          this._snackBar.openFromComponent(SnackBarComponent, {
            data: 'Data inserted successfully',
            panelClass: 'snackbar',
            duration: 10000
          });
          console.log('resonse of api ', res);
        })
        console.log(initial.Sheet1);
        return initial;
      }, {});
    }

    reader.readAsBinaryString(file);
  }

  rejectRequest(staffId: number) {
    this.service.get('PensionRequest/RejectPensionRequest', staffId).subscribe(res => {
      console.log(res);
    }, err => {
      console.log('reject request error -->', err);
    })
  }

  applyFilter(filterValue: string) {
    if (filterValue == "0")
      this.dataSource.filter = "";

    else {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches

      this.dataSource.filter = filterValue;
    }
  }

  /*name of the excel-file which will be downloaded. */
  fileName = 'PensionRequestsSheet.xlsx';

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // delete (ws['01'])
    // ws['!cols'] = [];
    // delete (ws['!cols'][9])

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}

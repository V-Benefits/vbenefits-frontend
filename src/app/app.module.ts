import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainNavComponent } from './shared/main-nav/main-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './_home/home-view/home.component';
import { Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule, MatNativeDateModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainBenefitsViewComponent } from './_mainBenefits/main-benefits-view/main-benefits-view.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PhoneProgramComponent } from './phone-program/phone-program-request/phone-program.component';
import { MatButtonModule } from '@angular/material/button';
import { ManageRequestsDialogComponent } from './_manageRequests/manage-requests-dialog/manage-requests-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ProfileInformationDialogComponent } from './_profileInformation/profile-information-dialog/profile-information-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SuccessDialogComponent } from './shared/success-dialog/success-dialog.component';
import { PhoneProgramModalComponent } from './phone-program/phone-program-modal/phone-program-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { PensionRequestViewComponent } from './_pensionRequest/pension-request-view/pension-request-view.component';
import { PensionRequestModalComponent } from './_pensionRequest/pension-request-modal/pension-request-modal.component';
import { MatSnackBarModule } from '@angular/material';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { MedicalRequestViewComponent } from './_medicalRequest/medical-request-view/medical-request-view.component';
import { MedicalRequestModalComponent } from './_medicalRequest/medical-request-view/medical-request-modal/medical-request-modal.component';
import { MatRadioModule } from '@angular/material/radio';
import { Deactivation1Component } from './_medicalRequest/deactivation/deactivation1/deactivation1.component';
import { Deactivation2Component } from './_medicalRequest/deactivation/deactivation2/deactivation2.component';
import { UploadExcelSheetComponent } from './_admin/upload-excel-sheet/upload-excel-sheet.component';
import { NurseryRequestViewComponent } from './_nurseryRequest/nursery-request-view/nursery-request-view.component';
import { AdminMainNavComponent } from './_admin/upload-excel-sheet/shared/admin-main-nav/admin-main-nav.component';
import { PensionViewComponent } from './_admin/upload-excel-sheet/pension/pension-view/pension-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SimCardsMainViewComponent } from './sim-Cards/sim-cards-main-view/sim-cards-main-view.component';
const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    MainBenefitsViewComponent,
    PhoneProgramComponent,
    ManageRequestsDialogComponent,
    ProfileInformationDialogComponent,
    SuccessDialogComponent,
    PhoneProgramModalComponent,
    PensionRequestViewComponent,
    PensionRequestModalComponent,
    SnackBarComponent,
    MedicalRequestViewComponent,
    MedicalRequestModalComponent,
    Deactivation1Component,
    Deactivation2Component,
    UploadExcelSheetComponent,
    NurseryRequestViewComponent,
    AdminMainNavComponent,
    PensionViewComponent,
    SimCardsMainViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatRadioModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatPaginatorModule
  ],
  providers: [MatDatepickerModule,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    // { provide: MdDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

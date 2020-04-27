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
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import { ProfileInformationDialogComponent } from './_profileInformation/profile-information-dialog/profile-information-dialog.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { SuccessDialogComponent } from './shared/success-dialog/success-dialog.component';
import { PhoneProgramModalComponent } from './phone-program/phone-program-modal/phone-program-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { PensionRequestViewComponent } from './_pensionRequest/pension-request-view/pension-request-view.component';
import { PensionRequestModalComponent } from './_pensionRequest/pension-request-modal/pension-request-modal.component';


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
    HttpClientModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

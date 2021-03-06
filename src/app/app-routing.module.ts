import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_home/home-view/home.component';
import { MainBenefitsViewComponent } from './_mainBenefits/main-benefits-view/main-benefits-view.component';
import { ManageRequestsDialogComponent } from './_manageRequests/manage-requests-dialog/manage-requests-dialog.component';
import { PhoneProgramComponent } from './phone-program/phone-program-request/phone-program.component';
import { PensionRequestViewComponent } from './_pensionRequest/pension-request-view/pension-request-view.component';
import { PensionRequestModalComponent } from './_pensionRequest/pension-request-modal/pension-request-modal.component';
import { MedicalRequestViewComponent } from './_medicalRequest/medical-request-view/medical-request-view.component';
import { UploadExcelSheetComponent } from './_admin/upload-excel-sheet/upload-excel-sheet.component';
import { NurseryRequestViewComponent } from './_nurseryRequest/nursery-request-view/nursery-request-view.component';
import { PensionViewComponent } from './_admin/upload-excel-sheet/pension/pension-view/pension-view.component';
import { AdminMainNavComponent } from './_admin/upload-excel-sheet/shared/admin-main-nav/admin-main-nav.component';
import { SimCardsMainViewComponent } from './sim-Cards/sim-cards-main-view/sim-cards-main-view.component';


const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'benefits', component: MainBenefitsViewComponent },
{ path: 'phoneProgram', component: PhoneProgramComponent },
{ path: 'pension', component: PensionRequestViewComponent },
{ path: 'modal', component: PensionRequestModalComponent },
{ path: 'medical', component: MedicalRequestViewComponent },
{ path: 'nursery', component: NurseryRequestViewComponent },
{ path: 'sim', component: SimCardsMainViewComponent },
{ path: 'admin/upload', component: UploadExcelSheetComponent },
{ path: 'admin/pensionview', component: PensionViewComponent },
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

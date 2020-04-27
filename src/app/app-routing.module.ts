import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_home/home-view/home.component';
import { MainBenefitsViewComponent } from './_mainBenefits/main-benefits-view/main-benefits-view.component';
import { ManageRequestsDialogComponent } from './_manageRequests/manage-requests-dialog/manage-requests-dialog.component';
import { PhoneProgramComponent } from './phone-program/phone-program-request/phone-program.component';
import { PensionRequestViewComponent } from './_pensionRequest/pension-request-view/pension-request-view.component';
import { PensionRequestModalComponent } from './_pensionRequest/pension-request-modal/pension-request-modal.component';


const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'benefits', component: MainBenefitsViewComponent },
{ path: 'phoneProgram', component: PhoneProgramComponent },
{ path: 'pension', component: PensionRequestViewComponent },
{ path: 'modal', component: PensionRequestModalComponent },
{ path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

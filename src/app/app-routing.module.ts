import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_home/home-view/home.component';
import { MainBenefitsViewComponent } from './_mainBenefits/main-benefits-view/main-benefits-view.component';
import { ManageRequestsDialogComponent } from './_manageRequests/manage-requests-dialog/manage-requests-dialog.component';
import { PhoneProgramComponent } from './phone-program/phone-program-request/phone-program.component';


const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'benefits', component: MainBenefitsViewComponent },
{ path: 'phoneProgram', component: PhoneProgramComponent },
{path: "**",redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

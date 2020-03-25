import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_home/home-view/home.component';
import { MainBenefitsViewComponent } from './_mainBenefits/main-benefits-view/main-benefits-view.component';
import { PhoneProgramComponent } from './phone-program/phone-program.component';


const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'benefits', component: MainBenefitsViewComponent },
{ path: 'phoneProgram', component: PhoneProgramComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

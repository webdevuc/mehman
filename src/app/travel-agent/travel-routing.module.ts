import { AuthGuard } from './../helpers/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { TravelAgentInnerLayoutComponent } from './layout/travel-agent-inner-layout/travel-agent-inner-layout.component';
import { TravelAgentMainLayoutComponent } from './layout/travel-agent-main-layout/travel-agent-main-layout.component';
import { TravelAgentBookingsComponent } from './travel-agent-bookings/travel-agent-bookings.component';
import { TravelAgentBookingDetailComponent } from './travel-agent-booking-detail/travel-agent-booking-detail.component';
import { TravelAgentContactUsComponent } from './travel-agent-contact-us/travel-agent-contact-us.component';
import { TravelAgentHomeComponent } from './auth/travel-agent-home/travel-agent-home.component';
import { TravelAgentDetailInnerLayoutComponent } from './layout/travel-agent-detail-inner-layout/travel-agent-detail-inner-layout.component';
import { TravelAgentSearchComponent } from './travel-agent-search/travel-agent-search.component';
import { TravelAgentImportpnrComponent } from './travel-agent-importpnr/travel-agent-importpnr.component';
import { TravelAgentViewRequestComponent } from './travel-agent-view-request/travel-agent-view-request.component';
import { ApplyRefundsAndVoidsComponent } from './apply-refunds-and-voids/apply-refunds-and-voids.component';
import { TravelAgentAddPaymentComponent } from './travel-agent-add-payment/travel-agent-add-payment.component';
import { TravelAgentViewLedgerComponent } from './travel-agent-view-ledger/travel-agent-view-ledger.component';

const routes: Routes = [
  {
    path: '',
    component: TravelAgentMainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'auth/signin', component: SignInComponent },
      { path: 'auth/signup', component: SignUpComponent },
      { path: 'auth/forgot-password', component: ForgotPasswordComponent },
      { path: 'auth/home', component: TravelAgentHomeComponent },
    ],
  },
  {
    path: '',
    component: TravelAgentInnerLayoutComponent,
    children: [
      { path: 'bookings', component: TravelAgentBookingsComponent },
      { path: 'contact-us', component: TravelAgentContactUsComponent },
      { path: 'search', component: TravelAgentSearchComponent },
      { path: 'import-prn', component: TravelAgentImportpnrComponent },
      { path: 'apply-refunds-and-voids', component: ApplyRefundsAndVoidsComponent },
      { path: 'apply-refunds-and-voids/:type/:id', component: ApplyRefundsAndVoidsComponent },
      { path: 'view-requests', component: TravelAgentViewRequestComponent },
      { path: 'add-payment', component: TravelAgentAddPaymentComponent },
      { path: 'view-ledger', component: TravelAgentViewLedgerComponent },
    ],
  },
  {
    path: '',
    component: TravelAgentDetailInnerLayoutComponent,
    children: [
      {
        path: 'booking-detail/:id',
        component: TravelAgentBookingDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelRoutingModule { }

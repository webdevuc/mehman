import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { BusinessUserHomeComponent } from './auth/business-user-home/business-user-home.component';
import { BusinessUserDetailInnerLayoutComponent } from './layout/business-user-detail-inner-layout/business-user-detail-inner-layout.component';
import { BusinessUserBookingDetailComponent } from './business-user-booking-detail/business-user-booking-detail.component';
import { BusinessUserContactUsComponent } from './business-user-contact-us/business-user-contact-us.component';
import { BusinessUserBookingsComponent } from './business-user-bookings/business-user-bookings.component';
import { BusinessUserInnerLayoutComponent } from './layout/business-user-inner-layout/business-user-inner-layout.component';
import { BusinessUserMainLayoutComponent } from './layout/business-user-main-layout/business-user-main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessUserMainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'auth/signin', component: SignInComponent },
      { path: 'auth/signup', component: SignUpComponent },
      { path: 'auth/forgot-password', component: ForgotPasswordComponent },
      { path: 'auth/home', component: BusinessUserHomeComponent },
    ],
  },
  {
    path: '',
    component: BusinessUserInnerLayoutComponent,
    children: [
      { path: 'bookings', component: BusinessUserBookingsComponent },
      // { path: 'booking-detail/:id', component: BusinessUserBookingDetailComponent },
      { path: 'contact-us', component: BusinessUserContactUsComponent },
    ],
  },
  {
    path: '',
    component: BusinessUserDetailInnerLayoutComponent,
    children: [
      {
        path: 'booking-detail/:id',
        component: BusinessUserBookingDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessUserRoutingModule { }

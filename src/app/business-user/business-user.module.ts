import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessUserRoutingModule } from './business-user-routing.module';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { BusinessUserBookingsComponent } from './business-user-bookings/business-user-bookings.component';
import { BusinessUserInnerLayoutComponent } from './layout/business-user-inner-layout/business-user-inner-layout.component';
import { BusinessUserMainLayoutComponent } from './layout/business-user-main-layout/business-user-main-layout.component';
import { BusinessUserMainHeaderComponent } from './layout/business-user-main-header/business-user-main-header.component';
import { BusinessUserBookingDetailComponent } from './business-user-booking-detail/business-user-booking-detail.component';
import { BusinessUserHomeComponent } from './auth/business-user-home/business-user-home.component';
import { BusinessUserDetailInnerLayoutComponent } from './layout/business-user-detail-inner-layout/business-user-detail-inner-layout.component';
import { BusinessUserInnerHeaderComponent } from './layout/business-user-inner-header/business-user-inner-header.component';
import { TableModule } from 'primeng/table';
import { BusinessUserContactUsComponent } from './business-user-contact-us/business-user-contact-us.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    HomeComponent,
    BusinessUserMainLayoutComponent,
    BusinessUserInnerLayoutComponent,
    BusinessUserBookingsComponent,
    BusinessUserMainHeaderComponent,
    BusinessUserInnerHeaderComponent,
    BusinessUserBookingDetailComponent,
    BusinessUserHomeComponent,
    BusinessUserDetailInnerLayoutComponent,
    BusinessUserContactUsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    BusinessUserRoutingModule,
    TableModule

  ],
})
export class BusinessUserModule { }

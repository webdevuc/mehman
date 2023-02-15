import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelRoutingModule } from './travel-routing.module';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { TravelAgentBookingsComponent } from './travel-agent-bookings/travel-agent-bookings.component';
import { TravelAgentInnerLayoutComponent } from './layout/travel-agent-inner-layout/travel-agent-inner-layout.component';
import { TravelAgentMainLayoutComponent } from './layout/travel-agent-main-layout/travel-agent-main-layout.component';
import { TravelAgentMainHeaderComponent } from './layout/travel-agent-main-header/travel-agent-main-header.component';
import { TravelAgentInnerHeaderComponent } from './layout/travel-agent-inner-header/travel-agent-inner-header.component';
import { TravelAgentBookingDetailComponent } from './travel-agent-booking-detail/travel-agent-booking-detail.component';
import { TravelAgentHomeComponent } from './auth/travel-agent-home/travel-agent-home.component';
import { TravelAgentDetailInnerLayoutComponent } from './layout/travel-agent-detail-inner-layout/travel-agent-detail-inner-layout.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TravelAgentContactUsComponent } from './travel-agent-contact-us/travel-agent-contact-us.component';
import { TravelAgentSearchComponent } from './travel-agent-search/travel-agent-search.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { MatCardModule } from '@angular/material/card';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MatRadioModule } from '@angular/material/radio';
import { ApplyRefundsAndVoidsComponent } from './apply-refunds-and-voids/apply-refunds-and-voids.component';
import { CalendarModule } from 'primeng/calendar';
import { TravelAgentViewRequestComponent } from './travel-agent-view-request/travel-agent-view-request.component';
import { TravelAgentAddPaymentComponent } from './travel-agent-add-payment/travel-agent-add-payment.component';
import { FlightsComponent } from './travel-agent-view-request/flights/flights.component';
import { VisasComponent } from './travel-agent-view-request/visas/visas.component';
import { TravelAgentViewLedgerComponent } from './travel-agent-view-ledger/travel-agent-view-ledger.component';
import { InputNumberModule } from 'primeng/inputnumber';
import {ToolbarModule} from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    HomeComponent,
    TravelAgentMainLayoutComponent,
    TravelAgentInnerLayoutComponent,
    TravelAgentBookingsComponent,
    TravelAgentMainHeaderComponent,
    TravelAgentInnerHeaderComponent,
    TravelAgentBookingDetailComponent,
    TravelAgentHomeComponent,
    TravelAgentDetailInnerLayoutComponent,
    TravelAgentContactUsComponent,
    TravelAgentSearchComponent,
    ApplyRefundsAndVoidsComponent,
    TravelAgentViewRequestComponent,
    TravelAgentAddPaymentComponent,
    FlightsComponent,
    VisasComponent,
    TravelAgentViewLedgerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TravelRoutingModule,
    TableModule,
    DropdownModule,
    NgxPrintElementModule,
    MatCardModule,
    DialogModule,
    ButtonModule,
    RippleModule,
    MatRadioModule,
    CalendarModule,
    InputNumberModule,
    ToolbarModule,
    TabViewModule,
    InputTextModule,    
    SplitButtonModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule
  ],
})
export class TravelModule { }

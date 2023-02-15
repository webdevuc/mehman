import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ReviewBookingComponent } from './review-booking/review-booking.component';
import { TravellerDetailsComponent } from './traveller-details/traveller-details.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlphabetOnlyDirective } from './shared/alphabet-only.directive';
import { TooltipModule } from 'primeng/tooltip';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { InputMaskModule } from 'primeng/inputmask';
import { TabViewModule } from 'primeng/tabview';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { PanelModule } from 'primeng/panel';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { EmiratesComponent } from './StaticPages/airlines/emirates/emirates.component';
import { QatarAirwaysComponent } from './StaticPages/airlines/qatar-airways/qatar-airways.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { VisaCheckComponent } from './visa-check/visa-check.component';
import { AirblueComponent } from './StaticPages/airlines/airblue/airblue.component';
import { SereneAirComponent } from './StaticPages/airlines/serene-air/serene-air.component';
import { PIAComponent } from './StaticPages/airlines/pia/pia.component';
import { AirsialComponent } from './StaticPages/airlines/airsial/airsial.component';
import { EtihadAirwaysComponent } from './StaticPages/airlines/etihad-airways/etihad-airways.component';
import { KuwaitAirwaysComponent } from './StaticPages/airlines/kuwait-airways/kuwait-airways.component';
import { SaudiaComponent } from './StaticPages/airlines/saudia/saudia.component';
import { TurkishAirlinesComponent } from './StaticPages/airlines/turkish-airlines/turkish-airlines.component';
import { SrilankanAirlinesComponent } from './StaticPages/airlines/srilankan-airlines/srilankan-airlines.component';
import { ThaiComponent } from './StaticPages/airlines/thai/thai.component';
import { PegasusAirlineComponent } from './StaticPages/airlines/pegasus-airline/pegasus-airline.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { ConfirmedBookingComponent } from './confirmed-booking/confirmed-booking.component';

const routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsModule) }
    ]
  },
  {
    path: 'home/:tabName',
    component: HomeComponent,
  },
  {
    path: 'search-results',
    component: SearchResultsComponent,
  },
  {
    path: 'review-booking/:id',
    component: ReviewBookingComponent,
  },
  {
    path: 'traveller-details/:id',
    component: TravellerDetailsComponent,
  },
  {
    path: 'make-payment/:id',
    component: MakePaymentComponent,
  },
  {
    path: 'confirmed-bookig',
    component: ConfirmedBookingComponent
  },
  {
    path: 'flights/airblue',
    component: AirblueComponent,
  },
  {
    path: 'flights/serene-air',
    component: SereneAirComponent,
  },
  {
    path: 'flights/PIA',
    component: PIAComponent,
  },
  {
    path: 'flights/airsial',
    component: AirsialComponent,
  },
    {
    path: 'flights/etihad-airways',
    component: EtihadAirwaysComponent,
  },
  {
    path: 'flights/kuwait-airways',
    component: KuwaitAirwaysComponent,
  },
  {
    path: 'flights/srilankan-airline',
    component: SrilankanAirlinesComponent,
  },
  {
    path: 'flights/saudia',
    component: SaudiaComponent,
  },

  {
    path: 'flights/qatar-airways',
    component: QatarAirwaysComponent,
  },
  {
    path: 'flights/turkish-airlines',
    component: TurkishAirlinesComponent,
  },
  {
    path: 'flights/thai',
    component: ThaiComponent,
  },
  {
    path: 'flights/pegasus',
    component: PegasusAirlineComponent,
  },
  {
    path: 'flights/emirates',
    component: EmiratesComponent,
  },
  {
    path: 'visa-check',
    component: VisaCheckComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    SearchResultsComponent,
    ReviewBookingComponent,
    TravellerDetailsComponent,
    MakePaymentComponent,
    AlphabetOnlyDirective,
    EmiratesComponent,
    QatarAirwaysComponent,
    VisaCheckComponent,
    AirblueComponent,
    SereneAirComponent,
    PIAComponent,
    SrilankanAirlinesComponent,
    ThaiComponent,
    PegasusAirlineComponent,
    EtihadAirwaysComponent,
    SaudiaComponent,
    ConfirmedBookingComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    RadioButtonModule,
    TooltipModule,
    CarouselModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    RippleModule,
    InputMaskModule,
    AutoCompleteModule,
    BsDatepickerModule.forRoot(),
    SharedModule,
    RouterModule.forChild(routes),
    TabViewModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    PanelModule,
    MatSelectModule,
    MatCardModule,
    BackButtonDisableModule.forRoot()
  ],
})
export class HomeModule {}

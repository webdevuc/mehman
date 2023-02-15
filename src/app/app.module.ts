import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UsersComponent } from './user/users.component';
import { TravelAgentComponent } from './travel-agent/travel-agent.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { OfferComponent } from './offer/offer.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlogDetailPageComponent } from './blog/blog-detail-page/blog-detail-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferDetailComponent } from './offer/offer-detail/offer-detail.component';
import { BusinessUserComponent } from './business-user/business-user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { AccordionModule } from 'primeng/accordion';
import { OfferByAirlineComponent } from './offer/offer-by-airline/offer-by-airline.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TravelAgentComponent,
    BlogComponent,
    OfferComponent,
    BlogDetailPageComponent,
    OfferDetailComponent,
    BusinessUserComponent,
    ContactUsComponent,
    OfferByAirlineComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    DataViewModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    PanelModule,
    RippleModule,
    CarouselModule,
    AccordionModule,
    // RouterModule.forRoot(appRoutes),
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    NgxPaginationModule,
  ],
  providers: [CookieService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

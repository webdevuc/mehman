import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { UserHeaderComponent } from './user-header/user-header.component';
import { MiddleComponent } from './middle/middle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedContactUsComponent } from './shared-contact-us/shared-contact-us.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SharedSearchResultsComponent } from './shared-search-results/shared-search-results.component';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CarouselModule } from 'primeng/carousel';
import { SharedMulticityComponent } from './shared-multicity/shared-multicity.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFaqComponent } from './mat-faq/mat-faq.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    HeaderComponent,
    UserHeaderComponent,
    MiddleComponent,
    SharedContactUsComponent,
    SharedSearchResultsComponent,
    SharedMulticityComponent,
    MatFaqComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,
    AutoCompleteModule,
    CarouselModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
  ],
  exports: [
    HeaderComponent,
    UserHeaderComponent,
    MiddleComponent,
    SharedContactUsComponent,
    SharedSearchResultsComponent,
    SharedMulticityComponent,
    MatFaqComponent,
  ],
  providers: [MessageService],
})
export class SharedModule {}
  
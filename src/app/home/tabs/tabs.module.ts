import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { FlightsTabComponent } from './flights-tab/flights-tab.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisaTabComponent } from './visa-tab/visa-tab.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    FlightsTabComponent,
    VisaTabComponent
  ],
  imports: [
    CommonModule,
    TabsRoutingModule,
    FormsModule,
    SharedModule,
    ButtonModule,
    DropdownModule
  ]
})
export class TabsModule { }

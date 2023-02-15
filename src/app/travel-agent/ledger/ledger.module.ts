import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { ViewLdegerComponent } from './view-ldeger/view-ldeger.component';


@NgModule({
  declarations: [
    ViewLdegerComponent
  ],
  imports: [
    CommonModule,
    LedgerRoutingModule
  ]
})
export class LedgerModule { }

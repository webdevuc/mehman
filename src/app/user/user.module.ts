import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BookingsComponent } from './bookings/bookings.component';
import { AuthGuardService } from '../auth/guard/auth-guard.service';
import { SharedModule } from '../shared/shared.module';

import { ManageAlertsComponent } from './manage-alerts/manage-alerts.component';
// import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

const routes = [
  {
    path: 'bookings',
    component: BookingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'manage-alerts',
    component: ManageAlertsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [BookingsComponent, ManageAlertsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    // DxDataGridModule,
    TableModule,

    RouterModule.forChild(routes),
  ],
})
export class UserModule { }

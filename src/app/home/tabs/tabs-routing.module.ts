import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsTabComponent } from './flights-tab/flights-tab.component';
import { VisaTabComponent } from './visa-tab/visa-tab.component';

const routes: Routes = [
  { path: '', component: FlightsTabComponent },
  { path: 'flights', component: FlightsTabComponent },
  { path: 'visas', component: VisaTabComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; import { TermsAndConditionComponent } from './terms-and-condition.component';


const routes = [
  {
    path: '',
    component: TermsAndConditionComponent
  },
];


@NgModule({
  declarations: [TermsAndConditionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
})
export class TermsAndConditionModule { }

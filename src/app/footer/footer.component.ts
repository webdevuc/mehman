import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { Subject } from 'rxjs';
import { Constant } from 'src/app/models/const';
import { CommonService } from 'src/app/services/common.service';
import { ToasterService } from 'src/app/services/toastr-service';

@Component({
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {

  newsLetterSubscriptionForm: FormGroup;
  isError: boolean;
  errorMsg: string;
  isSuccess: boolean;
  successMsg: string;
  submitted: boolean;
  phone: string;

  // Private
  private unsubscribeAll: Subject<any>;
  email: any;

  /**
   * Constructor
   *
   */
  constructor(private commonService: CommonService,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();
    this.phone = Constant.phone;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.newsLetterSubscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  clear() {
    this.isError = false;
    this.errorMsg = '';
    this.isSuccess = false;
    this.successMsg = '';
  }

  submit() {
    this.clear();
    this.submitted = true;
    if (this.newsLetterSubscriptionForm.invalid) {
      return;
    }

    this.email = this.newsLetterSubscriptionForm.controls.email.value;
    this.email = this.email.trim();

    this.commonService.newsLetterSubcription(this.email).subscribe(response => {
      if (response) {
        if (response.status === 'success') {
          this.isSuccess = true;
          this.submitted = false;
          this.newsLetterSubscriptionForm.reset();
          this.toasterService.showSuccess(
            'Subscribed successfully',
            'Success'
          );
          this.successMsg = 'Subscribed successfully';
        } else {
          if (response.message && response.message != null && response.message !== '') {
            this.toasterService.showError(
              response.message,
              'Error'
            );
          } else {
            this.toasterService.showError(
              'submit Unknown Error 1, try again',
              'Error'
            );
          }
        }
      } else {
        // this.setErrorMsg();
        this.toasterService.showError(
          'submit Unknown Error 2, try again',
          'Error'
        );
      }
    });
  }

  onNavigate(url) {
    window.open(url, "_blank");
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next(0);
    this.unsubscribeAll.complete();
  }
}

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
 class FooterModule { }
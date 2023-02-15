import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Constant } from 'src/app/models/const';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-shared-contact-us',
  templateUrl: './shared-contact-us.component.html',
  styleUrls: ['./shared-contact-us.component.scss'],
})
export class SharedContactUsComponent implements OnInit {
  contactUsForm: FormGroup;
  isError: boolean;
  errorMsg: string;
  isSuccess: boolean;
  successMsg: string;
  submitted: boolean;
  email: string;
  phone: string;

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {
    this.phone = Constant.phone;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.primengConfig.ripple = true;
    this.contactUsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  clear() {
    this.isError = false;
    this.errorMsg = '';
    this.isSuccess = false;
    this.successMsg = '';
  }

  onNavigate(url) {
    window.open(url, '_blank');
  }

  submit() {
    this.clear();
    this.submitted = true;
    if (this.contactUsForm.invalid) {
      return;
    }

    this.commonService
      .contactUs(this.contactUsForm.value)
      .subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            this.isSuccess = true;
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Message send successfully',
            });
          } else {
            if (
              response.message &&
              response.message != null &&
              response.message !== ''
            ) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: response.message,
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'submit Unknown Error 1, try again',
              });
            }
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'submit Unknown Error 2, try again',
          });
        }
      });
  }
}

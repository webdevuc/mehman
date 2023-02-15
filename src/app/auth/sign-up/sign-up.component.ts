import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, count } from 'rxjs/operators';

import { AuthService } from '../shared/auth.service';
import { RegisterModel } from '../models/register.model';
import { ToasterService } from 'src/app/services/toastr-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  submitted: boolean;
  isError: boolean;
  errorMsg: string;
  isSuccess: boolean;
  successMsg: string;
  isAcceptedTermsAndConditions: boolean;
  @ViewChild('firstNameInput') firstNameInput: ElementRef;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  verificationForm: FormGroup;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  code: string;
  verifySubmitted: boolean;

  isVerification: boolean;
  isResendOtp: boolean;
  @ViewChild('codeInput') codeInput: ElementRef;

  // Private
  private unsubscribeAll: Subject<any>;

  /*
    * Constructor
    *
    */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) {

    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /*
  * On init
  */
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.clear();
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.phoneNumber = '';
    this.code = '';
    this.isVerification = false;
    this.isResendOtp = false;
    this.submitted = false;
    this.verifySubmitted = false;
    this.isAcceptedTermsAndConditions = false;
    // this.authService.sendIsUserRegisteredSuccessfully(false);
    this.authService.sendIsPasswordResetSuccessfully(false);
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
      phoneNumber: ['', Validators.required]
    });
    this.verificationForm = this.formBuilder.group({
      // firstName: ['', [Validators.required, Validators.maxLength(50)]],
      // lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      // phoneNumber: ['', Validators.required],
      code: ['', [Validators.required]]
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    this.registerForm.get('password').valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('passwordConfirm').updateValueAndValidity();
      });
  }

  register(isResendOtp = false) {
    this.clear();
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (isResendOtp === false) {
      this.isVerification = false;
      this.isResendOtp = false;
    } else {
      setTimeout(() => {
        this.formGroupDirective.resetForm();
        this.verificationForm.patchValue({
          // firstName: this.firstName,
          // lastName: this.lastName,
          email: this.email
          // password: this.password,
          // phoneNumber: this.phoneNumber
        });
        // this.verificationForm.get('firstName').disable();
        // this.verificationForm.get('lastName').disable();
        this.verificationForm.get('email').disable();
        // this.verificationForm.get('password').disable();
        // this.verificationForm.get('phoneNumber').disable();
      }, 0);
    }
    const registerModel = new RegisterModel();
    const firstName = this.registerForm.controls.firstName.value;
    registerModel.firstName = firstName.trim();
    const lastName = this.registerForm.controls.lastName.value;
    registerModel.lastName = lastName.trim();
    const email = this.registerForm.controls.email.value;
    registerModel.email = email.trim();
    const password = this.registerForm.controls.password.value;
    registerModel.password = password.trim();
    const phoneNumber = this.registerForm.controls.phoneNumber.value;
    registerModel.phoneNumber = phoneNumber.trim();
    registerModel.isResend = isResendOtp;

    this.firstName = registerModel.firstName;
    this.lastName = registerModel.lastName;
    this.email = registerModel.email;
    this.password = registerModel.password;
    this.phoneNumber = registerModel.phoneNumber;

    this.authService.register(registerModel).subscribe(response => {
      if (response) {
        if (response.status === 'success') {
          // this.authService.sendIsUserRegisteredSuccessfully(true);
          // this.authService.setUserLoggedOut();
          this.verificationForm.patchValue({
            // firstName: this.firstName,
            // lastName: this.lastName,
            email: this.email
            // password: this.password,
            // phoneNumber: this.phoneNumber
          });
          // this.verificationForm.get('firstName').disable();
          // this.verificationForm.get('lastName').disable();
          this.verificationForm.get('email').disable();
          // this.verificationForm.get('password').disable();
          // this.verificationForm.get('phoneNumber').disable();
          this.isSuccess = true;
          this.successMsg = 'OTP is sent to your registered email.';
          this.isVerification = true;
          this.isResendOtp = false;
        } else {
          if (response.message != null && response.message !== undefined && response.message !== '') {
            // this.isError = true;
            // this.errorMsg = response.message;
            this.toasterService.showError(
              response.message,
              'Error'
            );
            this.clearRegister();
          } else {
            // this.setErrorMsg();
            this.toasterService.showError(
              'Register Unknown Error 1, try again',
              'Error'
            );
            this.clearRegister();
          }
        }
      } else {
        // this.setErrorMsg();
        this.toasterService.showError(
          'Register Unknown Error 2, try again',
          'Error'
        );
        this.clearRegister();
      }
    });
  }

  verifyCode() {
    this.clear();
    this.verifySubmitted = true;
    if (this.verificationForm.invalid) {
      return;
    }
    this.isResendOtp = false;
    this.code = this.verificationForm.controls.code.value;
    this.code = this.code.trim();
    this.authService.verifyEmailConfirmCode(this.code, this.email).subscribe(response => {
      if (response) {
        if (response.status === 'success') {
          const data = response.data;
          if (data.iec === true) {
            this.authService.setUserLoggedIn(data.u, data.token, data.fn, data.ln, data.r , data.bl,data.pn ,data.Opbl,data.aguserid,data.credLi,data.agid);
            // const role = this.authService.getRole();
            this.router.navigate(['/user/bookings']);
          } else {
            // this.setErrorMsg();
            this.toasterService.showError(
              'VerifyCode Unknown Error 1, try again',
              'Error'
            );
          }
        } else {
          if (response.message && response.message != null && response.message !== '') {
            this.isError = true;
            this.errorMsg = response.message;
            this.clearVerifyCode();
          } else {
            this.toasterService.showError(
              'VerifyCode Unknown Error 2, try again',
              'Error'
            );
            // this.setErrorMsg();
            this.clearVerifyCode();
          }
        }
      } else {
        // this.setErrorMsg();
        this.toasterService.showError(
          'VerifyCode Unknown Error 3, try again',
          'Error'
        );
        this.clearVerifyCode();
      }
    });
  }

  clear() {
    this.isError = false;
    this.errorMsg = '';
    this.isSuccess = false;
    this.successMsg = '';
  }

  clearRegister() {
    setTimeout(() => this.formGroupDirective.resetForm(), 0);
    this.firstNameInput.nativeElement.focus();
  }

  clearVerifyCode() {
    setTimeout(() => {
      this.formGroupDirective.resetForm();
      this.verificationForm.patchValue({
        // firstName: this.firstName,
        // lastName: this.lastName,
        email: this.email
        // password: this.password,
        // phoneNumber: this.phoneNumber
      });
      // this.verificationForm.get('firstName').disable();
      // this.verificationForm.get('lastName').disable();
      this.verificationForm.get('email').disable();
      // this.verificationForm.get('password').disable();
      // this.verificationForm.get('phoneNumber').disable();
      this.isResendOtp = true;
    }, 0);
    this.codeInput.nativeElement.focus();
  }

  // setErrorMsg() {
  //   this.isError = true;
  //   this.errorMsg = 'Something went wrong! Please try again.';
  // }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next(0);
    this.unsubscribeAll.complete();
  }
}

/*
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};

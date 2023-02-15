import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResetPasswordModel } from 'src/app/auth/models/reset-password.model';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { confirmPasswordValidator } from 'src/app/auth/sign-up/sign-up.component';
import { ToasterService } from 'src/app/services/toastr-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup;
  verificationForm: FormGroup;
  resetPasswordForm: FormGroup;
  submitted: boolean;
  verifySubmitted: boolean;
  resetSubmitted: boolean;
  email: string;
  code: string;

  isError: boolean;
  errorMsg: string;
  isSuccess: boolean;
  successMsg: string;

  isVerification: boolean;
  isResendOtp: boolean;
  isResetPassword: boolean;

  isResetSuccess: boolean;

  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('codeInput') codeInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  // Private
  private unsubscribeAll: Subject<any>;

  /*
   * Constructor
   *
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
    this.email = '';
    this.code = '';
    this.isVerification = false;
    this.isResetPassword = false;
    this.isResetSuccess = false;
    this.isResendOtp = false;
    this.submitted = false;
    this.verifySubmitted = false;
    this.resetSubmitted = false;
    // this.authService.sendIsUserRegisteredSuccessfully(false);
    this.authService.sendIsPasswordResetSuccessfully(false);
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.verificationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required]],
    });
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
        ],
      ],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    this.resetPasswordForm
      .get('password')
      .valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
      });
  }

  sendResetCode(isResendOtp = false) {
    this.clear();
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    if (isResendOtp === false) {
      this.isVerification = false;
      this.isResetPassword = false;
      this.isResendOtp = false;
    } else {
      setTimeout(() => {
        this.formGroupDirective.resetForm();
        this.verificationForm.patchValue({
          email: this.email,
        });
        this.verificationForm.get('email').disable();
      }, 0);
    }
    this.email = this.forgotPasswordForm.controls.email.value;
    this.email = this.email.trim();

    this.authService.forgotPassword(this.email).subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          this.verificationForm.patchValue({
            email: this.email,
          });
          this.verificationForm.get('email').disable();
          this.isSuccess = true;
          this.successMsg = 'OTP is sent to your registered email.';
          this.isVerification = true;
          this.isResendOtp = false;
        } else {
          if (
            response.message &&
            response.message != null &&
            response.message !== ''
          ) {
            // this.isError = true;
            // this.errorMsg = response.message;

            this.toasterService.showError(
              response.message,
              'Error'
            );

            this.clearSendResetCode();
          } else {

            // this.setErrorMsg();
            this.toasterService.showError(
              'SendResetCode Unknown Error 1, try again',
              'Error'
            );
            this.clearSendResetCode();
          }
        }
      } else {
        // this.setErrorMsg();
        this.toasterService.showError(
          'SendResetCode Unknown Error 2, try again',
          'Error'
        );
        this.clearSendResetCode();
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
    this.isResetPassword = false;
    this.code = this.verificationForm.controls.code.value;
    this.code = this.code.trim();
    this.authService
      .verifyForgotPasswordCode(this.code, this.email)
      .subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            this.resetPasswordForm.patchValue({
              email: this.email,
            });
            this.resetPasswordForm.get('email').disable();
            this.isVerification = false;
            this.isSuccess = true;
            this.successMsg = 'OTP is verified!';
            this.isResetPassword = true;
          } else {
            if (
              response.message &&
              response.message != null &&
              response.message !== ''
            ) {
              // this.isError = true;
              // this.errorMsg = response.message;
              this.toasterService.showError(
                response.message,
                'Error'
              );
              this.clearVerifyCode();
            } else {
              // this.setErrorMsg();
              this.toasterService.showError(
                'VerifyCode Unknown Error 1, try again',
                'Error'
              );
              this.clearVerifyCode();
            }
          }
        } else {
          // this.setErrorMsg();
          this.toasterService.showError(
            'VerifyCode Unknown Error 2, try again',
            'Error'
          );
          this.clearVerifyCode();
        }
      });
  }

  resetPassword() {
    this.clear();
    this.resetSubmitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const resetPasswordModel = new ResetPasswordModel();
    resetPasswordModel.email = this.email;
    resetPasswordModel.code = this.code;
    const newPassword = this.resetPasswordForm.controls.password.value;
    resetPasswordModel.newPassword = newPassword.trim();

    this.authService.resetPassword(resetPasswordModel).subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          this.isResetPassword = false;
          this.isResetSuccess = true;
          this.authService.sendIsPasswordResetSuccessfully(true);
          this.authService.setUserLoggedOut();
        } else {
          if (
            response.message &&
            response.message != null &&
            response.message !== ''
          ) {
            // this.isError = true;
            // this.errorMsg = response.message;
            this.toasterService.showError(
              response.message,
              'Error'
            );
            this.clearResetPassword();
          } else {
            // this.setErrorMsg();
            this.toasterService.showError(
              'ResetPassword Unknown Error 1, try again',
              'Error'
            );
            this.clearResetPassword();
          }
        }
      } else {
        // this.setErrorMsg();
        this.toasterService.showError(
          'ResetPassword Unknown Error 2, try again',
          'Error'
        );
        this.clearResetPassword();
      }
    });
  }

  clear() {
    this.isError = false;
    this.errorMsg = '';
    this.isSuccess = false;
    this.successMsg = '';
  }

  clearSendResetCode() {
    setTimeout(() => this.formGroupDirective.resetForm(), 0);
    this.emailInput.nativeElement.focus();
  }

  clearVerifyCode() {
    setTimeout(() => {
      this.formGroupDirective.resetForm();
      this.verificationForm.patchValue({
        email: this.email,
      });
      this.verificationForm.get('email').disable();
      this.isResendOtp = true;
    }, 0);
    this.codeInput.nativeElement.focus();
  }

  clearResetPassword() {
    setTimeout(() => {
      this.formGroupDirective.resetForm();
      this.resetPasswordForm.patchValue({
        email: this.email,
      });
      this.resetPasswordForm.get('email').disable();
    }, 0);
    this.passwordInput.nativeElement.focus();
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

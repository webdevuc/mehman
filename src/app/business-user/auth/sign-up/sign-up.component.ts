import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, count } from 'rxjs/operators';
import { RegisterModel } from 'src/app/auth/models/register.model';
import { AuthService } from 'src/app/auth/shared/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
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
  city: string;
  isBusinessUser: number;

  isVerification: boolean;
  isResendOtp: boolean;
  @ViewChild('codeInput') codeInput: ElementRef;

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
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
    // this.authService.sendIsPasswordResetSuccessfully(false);
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
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
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      travelAgencyName: [''],
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    this.registerForm
      .get('password')
      .valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('passwordConfirm').updateValueAndValidity();
      });
  }

  signUpConfirmation() {
    const html =
      'We will review your request and contact you shortly. However, do not hesitate to <a href=\'/contact-us\'>contact us</a> to know the status of request';
    Swal.fire({
      title: 'Thanks for submitting your request',
      html,
      icon: 'success',
      confirmButtonText: `Ok`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/business-user/home']);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  register(isResendOtp = false) {
    this.clear();
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
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
    const city = this.registerForm.controls.city.value;
    registerModel.city = city.trim();
    const travelAgencyName = this.registerForm.controls.travelAgencyName.value;
    registerModel.travelAgencyName = travelAgencyName.trim();

    registerModel.isResend = isResendOtp;

    registerModel.isCurrentlyWorkingAsBusinessUser =
      this.isBusinessUser === 0 ? false : true;

    this.firstName = registerModel.firstName;
    this.lastName = registerModel.lastName;
    this.email = registerModel.email;
    this.password = registerModel.password;
    this.city = registerModel.city;

    this.authService
      .registerBusinessUser(registerModel)
      .subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            // tslint:disable-next-line: max-line-length
            // Swal.fire('Thanks for submitting your request', 'We will review your request and contact you shortly. However, do not hesitate to <a href='/contact-us'>contact us</a> to know the status of request', 'success')
            this.signUpConfirmation();
          } else {
            if (
              response.message != null &&
              response.message !== undefined &&
              response.message !== ''
            ) {
              this.isError = true;
              this.errorMsg = response.message;
              this.clearRegister();
            } else {
              this.errorMsg = 'Register Err 1: Unknown; Try Again';
              this.isError = true;
              this.clearRegister();
            }
          }
        } else {
          this.errorMsg = 'Register Err 2: Unknown; Try Again';
          this.isError = true;
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
    this.authService
      .verifyEmailConfirmCode(this.code, this.email)
      .subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            const data = response.data;
            if (data.iec === true) {
              this.authService.setUserLoggedIn(
                data.u,
                data.token,
                data.fn,
                data.ln,
                data.r,
                data.bl,
                data.pn,
                data.Opbl,
                data.aguserid,
                data.credLi,
                data.agid
              );
              // const role = this.authService.getRole();
              this.router.navigate(['/user/bookings']);
            } else {
              this.errorMsg = 'VerifyCode Err 1: Unknown; Try Again';
            }
            this.isError = true;
          } else {
            if (
              response.message &&
              response.message != null &&
              response.message !== ''
            ) {
              this.isError = true;
              this.errorMsg = response.message;
              this.clearVerifyCode();
            } else {
              this.errorMsg = 'VerifyCode Err 2: Unknown; Try Again';
              this.isError = true;
              this.clearVerifyCode();
            }
          }
        } else {
          this.errorMsg = 'VerifyCode Err 3: Unknown; Try Again';
          this.isError = true;
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
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
      });
      this.verificationForm.get('firstName').disable();
      this.verificationForm.get('lastName').disable();
      this.verificationForm.get('email').disable();
      this.verificationForm.get('password').disable();
      this.verificationForm.get('phoneNumber').disable();
      this.isResendOtp = true;
    }, 0);
    this.codeInput.nativeElement.focus();
  }

  setErrorMsg() {
    this.isError = true;
    this.errorMsg = 'Something went wrong! Please try again.';
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

/**
 * Confirm password validator
 */
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
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

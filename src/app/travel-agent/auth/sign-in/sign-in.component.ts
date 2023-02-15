import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { LoginModel } from 'src/app/auth/models/login.model';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted: boolean;
  isloggedOut: boolean;
  isError: boolean;
  errorMsg: string;
  isSuccess: boolean;
  successMsg: string;
  // isUserRegisteredSuccessfully: boolean;
  isPasswordResetSuccessfully: boolean;
  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  verificationForm: FormGroup;
  email: string;
  password: string;
  code: string;
  verifySubmitted: boolean;

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
    private router: Router,
    private cookieService: CookieService
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
    this.checkLogOut();
    this.clear();
    this.email = '';
    this.password = '';
    this.code = '';
    this.isVerification = false;
    this.isResendOtp = false;
    this.submitted = false;
    this.verifySubmitted = false;
    // this.authService.currentIsUserRegisteredSuccessfully.subscribe(status => this.isUserRegisteredSuccessfully = status);
    this.authService.currentiIsPasswordResetSuccessfully.subscribe(
      (status) => (this.isPasswordResetSuccessfully = status)
    );
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
        ],
      ],
    });
    this.verificationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
        ],
      ],
      code: ['', [Validators.required]],
    });
  }

  login(isResendOtp = false) {
    this.clear();
    // this.authService.sendIsUserRegisteredSuccessfully(false);
    this.authService.sendIsPasswordResetSuccessfully(false);
    this.isloggedOut = false;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const auth = new LoginModel();
    const email = this.loginForm.controls.email.value;
    auth.email = email.trim();
    const password = this.loginForm.controls.password.value;
    auth.password = password.trim();
    this.email = auth.email;
    this.password = auth.password;

    this.authService.login(auth).subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          const data = response.data;
          console.log('login response', response.data);
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
          this.router.navigate(['/travel-agent/search']);
        } else {
          if (
            response.message != null &&
            response.message !== undefined &&
            response.message !== ''
          ) {
            this.isError = true;
            this.errorMsg = response.message;
            this.clearLogin();
          } else {
            this.setErrorMsg();
            this.clearLogin();
          }
        }
      } else {
        this.setErrorMsg();
        this.clearLogin();
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
              this.setErrorMsg();
            }
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
              this.setErrorMsg();
              this.clearVerifyCode();
            }
          }
        } else {
          this.setErrorMsg();
          this.clearVerifyCode();
        }
      });
  }

  checkLogOut() {
    const obj = this.cookieService.get('loggedOut');
    if (obj === 'true') {
      this.isloggedOut = true;
      this.cookieService.set('loggedOut', 'false', 2, '/');
    } else {
      this.isloggedOut = false;
      this.cookieService.delete('loggedOut');
    }
  }

  clear() {
    this.isError = false;
    this.errorMsg = '';
    this.isSuccess = false;
    this.successMsg = '';
  }

  clearLogin() {
    setTimeout(() => this.formGroupDirective.resetForm(), 0);
    this.authService.setTravelAgentLoggedOut();
    this.isloggedOut = false;
    this.emailInput.nativeElement.focus();
  }

  clearVerifyCode() {
    setTimeout(() => {
      this.formGroupDirective.resetForm();
      this.verificationForm.patchValue({
        email: this.email,
        password: this.password,
      });
      this.verificationForm.get('email').disable();
      this.verificationForm.get('password').disable();
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

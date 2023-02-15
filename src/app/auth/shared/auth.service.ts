import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {
  Observable,
  BehaviorSubject,
  map,
  repeatWhen,
  interval,
} from 'rxjs';
import { ApiCallService } from '../../services/api-call.service';
import { RegisterModel } from '../models/register.model';
import { ApiResultModel } from '../../models/api-result.model';
import { LoginModel } from '../models/login.model';
import { ResetPasswordModel } from '../models/reset-password.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private api: ApiCallService,
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient
  ) { }

  // This is used for success message of password reset
  private isPasswordResetSuccessfully = new BehaviorSubject<boolean>(false);
  currentiIsPasswordResetSuccessfully =
    this.isPasswordResetSuccessfully.asObservable();

  private registerUrl = `${environment.commonApiUrl}/auth/register`;
  // private registerUrl = this.commonService.commonApiEndPoint + '/auth/register';

  private registerTravelAgentUrl = `${environment.commonApiUrl}/travelagent/register`;
  private registerBusinessUserUrl = `${environment.commonApiUrl}/businessuser/register`;

  // private registerTravelAgentUrl = this.commonService.commonApiEndPoint + '/travelagent/register';

  private loginUrl = `${environment.commonApiUrl}/auth/login`;
  // private loginUrl = this.commonService.commonApiEndPoint + '/auth/login';

  private verifyEmailConfirmCodeUrl = `${environment.commonApiUrl}/auth/VerifyEmailConfirmCode`;
  // private verifyEmailConfirmCodeUrl = this.commonService.commonApiEndPoint + '/auth/VerifyEmailConfirmCode';

  private forgotPasswordUrl = `${environment.commonApiUrl}/auth/ForgotPassword`;
  // private forgotPasswordUrl = this.commonService.commonApiEndPoint + '/auth/ForgotPassword';

  private verifyForgotPasswordCodeUrl = `${environment.commonApiUrl}/auth/VerifyForgotPasswordCode`;
  // private verifyForgotPasswordCodeUrl =  this.commonService.commonApiEndPoint + '/auth/VerifyForgotPasswordCode';

  private resetPasswordUrl = `${environment.commonApiUrl}/auth/ResetPassword`;
  sendIsPasswordResetSuccessfully(newIsPasswordResetSuccessfully: any) {
    this.isPasswordResetSuccessfully.next(newIsPasswordResetSuccessfully);
  }

  register(registerModel: RegisterModel): Observable<ApiResultModel> {
    return this.api.post<ApiResultModel>(this.registerUrl, registerModel);
  }

  registerTravelAgent(
    registerModel: RegisterModel
  ): Observable<ApiResultModel> {
    return this.api.post<ApiResultModel>(
      this.registerTravelAgentUrl,
      registerModel
    );
  }

  registerBusinessUser(
    registerModel: RegisterModel
  ): Observable<ApiResultModel> {
    return this.api.post<ApiResultModel>(
      this.registerBusinessUserUrl,
      registerModel
    );
  }

  login(auth: LoginModel): Observable<ApiResultModel> {
    return this.api.post<ApiResultModel>(this.loginUrl, auth);
  }

  healthCheck(healthCheckURL: string) {
    return this.http.get<any>(healthCheckURL, { observe: 'response' }).pipe(
      map((resp: any) => {
        if (resp.status !== 200) {
          throw resp;
        }
        return resp.status;
      }),
      repeatWhen(() => interval(300000))
    );
  }

  verifyEmailConfirmCode(code: string, email: string) {
    return this.api.get<ApiResultModel>(
      this.verifyEmailConfirmCodeUrl + '?code=' + code + '&email=' + email,
      'Verify Email Confirm Code',
      new ApiResultModel()
    );
  }

  forgotPassword(email: string): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.forgotPasswordUrl + '?email=' + email,
      'Forgot Password',
      new ApiResultModel()
    );
  }

  verifyForgotPasswordCode(
    code: string,
    email: string
  ): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.verifyForgotPasswordCodeUrl + '?code=' + code + '&email=' + email,
      'Verify Forgot Password Code',
      new ApiResultModel()
    );
  }

  resetPassword(resetPassword: ResetPasswordModel): Observable<ApiResultModel> {
    return this.api.post<ApiResultModel>(this.resetPasswordUrl, resetPassword);
  }

  isUserLoggedIn() {
    return this.cookieService.get('loggedIn') == 'true';
  }

  setUserLoggedIn(email, token, firstName, lastName, userRole, balance, phonenumber, opningBalance, agentUserId, creditLimit, agentId) {

    this.cookieService.set('email', email, 2, '/');
    this.cookieService.set('loggedIn', 'true', 2, '/');
    this.cookieService.set('token', token, 2, '/');
    this.cookieService.set('r', userRole, 2, '/');
    this.cookieService.set('fn', firstName, 2, '/');
    this.cookieService.set('ln', lastName, 2, '/');
    this.cookieService.set('bl', balance, 2, '/');
    this.cookieService.set('Opbl', opningBalance, 2, '/');
    this.cookieService.set('credLi', creditLimit, 2, '/');
    this.cookieService.set('aguserid', agentUserId, 2, '/');
    this.cookieService.set('agid', agentId, 2, '/');
    this.cookieService.set('loggedOut', 'false', 2, '/');
    this.cookieService.set('phonenumber', phonenumber, 2, '/');
  }

  setUserLoggedOut() {
    this.cookieService.delete('loggedOut', '/');
    this.cookieService.delete('email', '/');
    this.cookieService.delete('loggedIn', '/');
    this.cookieService.delete('token', '/');
    this.cookieService.delete('r', '/');
    this.cookieService.delete('fn', '/');
    this.cookieService.delete('ln', '/');
    this.cookieService.delete('bl', '/');
    this.cookieService.delete('Opbl', '/');
    this.cookieService.delete('credLi', '/');
    this.cookieService.delete('aguserid', '/');
    this.cookieService.delete('agid', '/');
    this.cookieService.delete('phonenumber', '/');
    this.router.navigate(['/auth/signin']);
  }

  setTravelAgentLoggedOut() {
    this.cookieService.delete('loggedOut', '/');
    this.cookieService.delete('email', '/');
    this.cookieService.delete('loggedIn', '/');
    this.cookieService.delete('token', '/');
    this.cookieService.delete('r', '/');
    this.cookieService.delete('fn', '/');
    this.cookieService.delete('ln', '/');
    this.cookieService.delete('bl', '/');
    this.cookieService.delete('Opbl', '/');
    this.cookieService.delete('credLi', '/');
    this.cookieService.delete('aguserid', '/');
    this.cookieService.delete('agid', '/');
    this.cookieService.delete('phonenumber', '/');
    this.router.navigate(['/travel-agent/auth/signin']);
  }

  setBusinessUserLoggedOut() {
    this.cookieService.delete('loggedOut', '/');
    this.cookieService.delete('email', '/');
    this.cookieService.delete('loggedIn', '/');
    this.cookieService.delete('token', '/');
    this.cookieService.delete('r', '/');
    this.cookieService.delete('fn', '/');
    this.cookieService.delete('ln', '/');
    this.cookieService.delete('bl', '/');
    this.cookieService.delete('Opbl', '/');
    this.cookieService.delete('credLi', '/');
    this.cookieService.delete('aguserid', '/');
    this.cookieService.delete('agid', '/');
    this.cookieService.delete('phonenumber', '/');
    this.router.navigate(['/business-user/auth/signin']);
  }

  loggedOut() {
    this.cookieService.set('loggedOut', 'true', 2, '/');
    this.cookieService.delete('email', '/');
    this.cookieService.delete('loggedIn', '/');
    this.cookieService.delete('token', '/');
    this.cookieService.delete('r', '/');
    this.cookieService.delete('fn', '/');
    this.cookieService.delete('ln', '/');
    this.cookieService.delete('bl', '/');
    this.cookieService.delete('Opbl', '/');
    this.cookieService.delete('credLi', '/');
    this.cookieService.delete('aguserid', '/');
    this.cookieService.delete('agid', '/');
    this.cookieService.delete('phonenumber', '/');
    this.router.navigate(['/auth/signin']);
  }


  getUserEmail() {
    return this.cookieService.get('email');
  }

  getUserPhoneNo() {
    return this.cookieService.get('phonenumber');
  }

  getToken() {
    return this.cookieService.get('token');
  }

  getName() {
    return this.cookieService.get('fn') + ' ' + this.cookieService.get('ln');
  }

  getBalance() {
    return this.cookieService.get('bl');
  }
  getOpningBalance() {
    return this.cookieService.get('Opbl');

  }
  getAgentUserId() {
    return this.cookieService.get('aguserid');
  }
  getAgentId() {
    return this.cookieService.get('agid');
  }

  getCreditLimit() {
    return this.cookieService.get('credLi');
  }
  getRole() {
    const role = this.cookieService.get('r');
    if (role !== undefined && role != null && role !== '') {
      const obj = parseInt(role);
      switch (obj) {
        case 5:
          return 'User';
        case 3:
          return 'TravelAgent';
        case 4:
          return 'BusinessUser';
        default:
          return '';
      }
    }
  }
}

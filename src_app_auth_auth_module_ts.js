"use strict";(self.webpackChunkmehman_booking_engine=self.webpackChunkmehman_booking_engine||[]).push([["src_app_auth_auth_module_ts"],{65210:(ke,v,a)=>{a.r(v),a.d(v,{AuthModule:()=>g});var m=a(94666),r=a(2508),p=a(88062),h=a(50253),Z=a(56741),e=a(22560),w=a(54528),T=a(30185),x=a(65863);const F=["emailInput"],C=["codeInput"];function P(t,o){1&t&&(e.TgZ(0,"div",27),e._uU(1," Password reset successfully! "),e.qZA())}function I(t,o){1&t&&(e.TgZ(0,"div",28),e._uU(1," You have been logged out successfully! "),e.qZA())}function S(t,o){if(1&t&&(e.TgZ(0,"div",29),e._uU(1),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.hij(" ",i.errorMsg," ")}}function q(t,o){if(1&t&&(e.TgZ(0,"div",27),e._uU(1),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.hij(" ",i.successMsg," ")}}function y(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Email is required."),e.qZA())}function U(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Enter a valid email."),e.qZA())}function k(t,o){if(1&t&&(e.TgZ(0,"div",30),e.YNc(1,y,2,0,"div",6),e.YNc(2,U,2,0,"div",6),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.loginForm.get("email").errors.required),e.xp6(1),e.Q6J("ngIf",i.loginForm.get("email").errors.email)}}function A(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Password is required."),e.qZA())}function J(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Password must be at least 8 characters."),e.qZA())}function Q(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Password must be at max 25 characters."),e.qZA())}function E(t,o){if(1&t&&(e.TgZ(0,"div",30),e.YNc(1,A,2,0,"div",6),e.YNc(2,J,2,0,"div",6),e.YNc(3,Q,2,0,"div",6),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.loginForm.get("password").errors.required),e.xp6(1),e.Q6J("ngIf",i.loginForm.get("password").errors.minlength),e.xp6(1),e.Q6J("ngIf",i.loginForm.get("password").errors.maxlength)}}const u=function(t){return{"is-invalid":t}},N=function(){return["/auth/signup"]};function Y(t,o){if(1&t){const i=e.EpF();e.ynx(0),e.TgZ(1,"div",7)(2,"h2"),e._uU(3,"Good to see you again"),e.qZA(),e.TgZ(4,"p"),e._uU(5,"Sign in for member-only deals and access your trip details"),e.qZA()(),e.TgZ(6,"div",8)(7,"form",9),e.YNc(8,P,2,0,"div",10),e.YNc(9,I,2,0,"div",11),e.YNc(10,S,2,1,"div",12),e.YNc(11,q,2,1,"div",10),e.TgZ(12,"label"),e._uU(13,"Email"),e.qZA(),e._UZ(14,"input",13,14),e.YNc(16,k,3,2,"div",15),e.TgZ(17,"label"),e._uU(18,"Password"),e.qZA(),e._UZ(19,"input",16),e.YNc(20,E,4,3,"div",15),e.TgZ(21,"div",17)(22,"div",18),e._UZ(23,"div",19),e.qZA(),e.TgZ(24,"div",20)(25,"a",21),e._uU(26,"Forget Password?"),e.qZA()()(),e.TgZ(27,"button",22),e.NdJ("click",function(){e.CHM(i);const n=e.oxw();return e.KtG(n.login())}),e._uU(28," Sign In "),e.qZA()()(),e.TgZ(29,"div",23)(30,"div",24)(31,"h5"),e._uU(32,"Don\u2019t have an account?"),e.qZA()(),e.TgZ(33,"div",25)(34,"a",26),e._uU(35,"Create Account"),e.qZA()()(),e.BQk()}if(2&t){const i=e.oxw();e.xp6(7),e.Q6J("formGroup",i.loginForm),e.xp6(1),e.Q6J("ngIf",i.isPasswordResetSuccessfully),e.xp6(1),e.Q6J("ngIf",i.isloggedOut),e.xp6(1),e.Q6J("ngIf",i.isError),e.xp6(1),e.Q6J("ngIf",i.isSuccess),e.xp6(3),e.Q6J("ngClass",e.VKq(11,u,(i.submitted||i.loginForm.get("email").touched)&&i.loginForm.get("email").errors)),e.xp6(2),e.Q6J("ngIf",i.loginForm.get("email").errors&&(i.submitted||i.loginForm.get("email").touched)),e.xp6(3),e.Q6J("ngClass",e.VKq(13,u,(i.submitted||i.loginForm.get("password").touched)&&i.loginForm.get("password").errors)),e.xp6(1),e.Q6J("ngIf",i.loginForm.get("password").errors&&(i.submitted||i.loginForm.get("password").touched)),e.xp6(7),e.Q6J("disabled",i.loginForm.invalid&&i.submitted),e.xp6(7),e.Q6J("routerLink",e.DdM(15,N))}}function O(t,o){if(1&t&&(e.TgZ(0,"div",29),e._uU(1),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.hij(" ",i.errorMsg," ")}}function R(t,o){if(1&t&&(e.TgZ(0,"div",27),e._uU(1),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.hij(" ",i.successMsg," ")}}function M(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Email is required."),e.qZA())}function V(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Enter a valid email."),e.qZA())}function G(t,o){if(1&t&&(e.TgZ(0,"div",30),e.YNc(1,M,2,0,"div",6),e.YNc(2,V,2,0,"div",6),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("email").errors.required),e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("email").errors.email)}}function L(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Password is required."),e.qZA())}function K(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Password must be at least 8 characters."),e.qZA())}function j(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Password must be at max 25 characters."),e.qZA())}function B(t,o){if(1&t&&(e.TgZ(0,"div",30),e.YNc(1,L,2,0,"div",6),e.YNc(2,K,2,0,"div",6),e.YNc(3,j,2,0,"div",6),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("password").errors.required),e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("password").errors.minlength),e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("password").errors.maxlength)}}function D(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"OTP (from Mail) is required."),e.qZA())}function H(t,o){if(1&t&&(e.TgZ(0,"div",30),e.YNc(1,D,2,0,"div",6),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("code").errors.required)}}function z(t,o){if(1&t){const i=e.EpF();e.TgZ(0,"button",35),e.NdJ("click",function(){e.CHM(i);const n=e.oxw(2);return e.KtG(n.login(!0))}),e._uU(1," Resend OTP "),e.qZA()}}function X(t,o){if(1&t){const i=e.EpF();e.ynx(0),e.TgZ(1,"div",7)(2,"h2"),e._uU(3,"Verify OTP"),e.qZA(),e.TgZ(4,"p"),e._uU(5,"Confirm your registered email address"),e.qZA()(),e.TgZ(6,"div",8)(7,"form",9),e.YNc(8,O,2,1,"div",12),e.YNc(9,R,2,1,"div",10),e.TgZ(10,"label"),e._uU(11,"Email"),e.qZA(),e._UZ(12,"input",13),e.YNc(13,G,3,2,"div",15),e.TgZ(14,"label"),e._uU(15,"Password"),e.qZA(),e._UZ(16,"input",16),e.YNc(17,B,4,3,"div",15),e.TgZ(18,"label"),e._uU(19,"OTP (check your mail)"),e.qZA(),e._UZ(20,"input",31,32),e.YNc(22,H,2,1,"div",15),e.TgZ(23,"button",33),e.NdJ("click",function(){e.CHM(i);const n=e.oxw();return e.KtG(n.verifyCode())}),e._uU(24," Verify OTP "),e.qZA(),e.YNc(25,z,2,0,"button",34),e.qZA()(),e.BQk()}if(2&t){const i=e.oxw();e.xp6(7),e.Q6J("formGroup",i.verificationForm),e.xp6(1),e.Q6J("ngIf",i.isError),e.xp6(1),e.Q6J("ngIf",i.isSuccess),e.xp6(3),e.Q6J("ngClass",e.VKq(11,u,(i.verifySubmitted||i.verificationForm.get("email").touched)&&i.verificationForm.get("email").errors)),e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("email").errors&&(i.verifySubmitted||i.verificationForm.get("email").touched)),e.xp6(3),e.Q6J("ngClass",e.VKq(13,u,(i.verifySubmitted||i.verificationForm.get("password").touched)&&i.verificationForm.get("password").errors)),e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("password").errors&&(i.verifySubmitted||i.verificationForm.get("password").touched)),e.xp6(3),e.Q6J("ngClass",e.VKq(15,u,(i.verifySubmitted||i.verificationForm.get("code").touched)&&i.verificationForm.get("code").errors)),e.xp6(2),e.Q6J("ngIf",i.verificationForm.get("code").errors&&(i.verifySubmitted||i.verificationForm.get("code").touched)),e.xp6(1),e.Q6J("disabled",i.verificationForm.invalid&&i.verifySubmitted),e.xp6(2),e.Q6J("ngIf",i.isResendOtp)}}class _{constructor(o,i,s,n,d){this.formBuilder=o,this.authService=i,this.router=s,this.cookieService=n,this.toasterService=d,this.unsubscribeAll=new h.x}ngOnInit(){window.scrollTo(0,0),this.checkLogOut(),this.clear(),this.email="",this.password="",this.code="",this.isVerification=!1,this.isResendOtp=!1,this.submitted=!1,this.verifySubmitted=!1,this.authService.currentiIsPasswordResetSuccessfully.subscribe(o=>this.isPasswordResetSuccessfully=o),this.loginForm=this.formBuilder.group({email:["",[r.kI.required,r.kI.email]],password:["",[r.kI.required,r.kI.minLength(8),r.kI.maxLength(25)]]}),this.verificationForm=this.formBuilder.group({email:["",[r.kI.required,r.kI.email]],password:["",[r.kI.required,r.kI.minLength(8),r.kI.maxLength(25)]],code:["",[r.kI.required]]})}login(o=!1){if(this.clear(),this.authService.sendIsPasswordResetSuccessfully(!1),this.isloggedOut=!1,this.submitted=!0,this.loginForm.invalid)return;!1===o?(this.isVerification=!1,this.isResendOtp=!1):setTimeout(()=>{this.formGroupDirective.resetForm(),this.verificationForm.patchValue({email:this.email,password:this.password}),this.verificationForm.get("email").disable()},0);const i=new Z.W,s=this.loginForm.controls.email.value;i.email=s.trim();const n=this.loginForm.controls.password.value;i.password=n.trim(),this.email=i.email,this.password=i.password,this.authService.login(i).subscribe(d=>{if(d)if("success"===d.status){const c=d.data;!0===c.iec?(this.authService.setUserLoggedIn(c.u,c.token,c.fn,c.ln,c.r,c.bl,c.pn,c.Opbl,c.aguserid,c.credLi,c.agid),this.router.navigate(["/user/bookings"])):(this.verificationForm.patchValue({email:this.email,password:this.password}),this.verificationForm.get("email").disable(),this.verificationForm.get("password").disable(),this.isSuccess=!0,this.successMsg="OTP is sent to your registered email.",this.isVerification=!0,this.isResendOtp=!1)}else null!=d.message&&void 0!==d.message&&""!==d.message?(this.toasterService.showError(d.message,"Error"),this.clearLogin()):(this.toasterService.showError("Login Unknown Error 1, try again","Error"),this.clearLogin());else this.toasterService.showError("Login Unknown Error 1, try again","Error"),this.clearLogin()})}verifyCode(){this.clear(),this.verifySubmitted=!0,!this.verificationForm.invalid&&(this.isResendOtp=!1,this.code=this.verificationForm.controls.code.value,this.code=this.code.trim(),this.authService.verifyEmailConfirmCode(this.code,this.email).subscribe(o=>{if(o)if("success"===o.status){const i=o.data;!0===i.iec?(this.authService.setUserLoggedIn(i.u,i.token,i.fn,i.ln,i.r,i.bl,i.pn,i.Opbl,i.aguserid,i.credLi,i.agid),this.router.navigate(["/user/bookings"])):this.toasterService.showError("VerifyCode Unknown Error 1, try again","Error")}else o.message&&null!=o.message&&""!==o.message?(this.isError=!0,this.errorMsg=o.message,this.clearVerifyCode()):(this.toasterService.showError("VerifyCode Unknown Error 2, try again","Error"),this.clearVerifyCode());else this.toasterService.showError("VerifyCode Unknown Error 3, try again","Error"),this.clearVerifyCode()}))}checkLogOut(){"true"===this.cookieService.get("loggedOut")?(this.isloggedOut=!0,this.cookieService.set("loggedOut","false",2,"/")):(this.isloggedOut=!1,this.cookieService.delete("loggedOut"))}clear(){this.isError=!1,this.errorMsg="",this.isSuccess=!1,this.successMsg=""}clearLogin(){setTimeout(()=>this.formGroupDirective.resetForm(),0),this.authService.setUserLoggedOut(),this.isloggedOut=!1,this.emailInput.nativeElement.focus()}clearVerifyCode(){setTimeout(()=>{this.formGroupDirective.resetForm(),this.verificationForm.patchValue({email:this.email,password:this.password}),this.verificationForm.get("email").disable(),this.verificationForm.get("password").disable(),this.isResendOtp=!0},0),this.codeInput.nativeElement.focus()}ngOnDestroy(){this.unsubscribeAll.next(0),this.unsubscribeAll.complete()}}_.\u0275fac=function(o){return new(o||_)(e.Y36(r.qu),e.Y36(w.e),e.Y36(p.F0),e.Y36(T.N),e.Y36(x.M))},_.\u0275cmp=e.Xpm({type:_,selectors:[["app-sign-in"]],viewQuery:function(o,i){if(1&o&&(e.Gf(F,5),e.Gf(r.sg,5),e.Gf(C,5)),2&o){let s;e.iGM(s=e.CRH())&&(i.emailInput=s.first),e.iGM(s=e.CRH())&&(i.formGroupDirective=s.first),e.iGM(s=e.CRH())&&(i.codeInput=s.first)}},decls:8,vars:2,consts:[[1,"hero-signup"],[1,"container"],[1,"row"],[1,"col-lg-12","col-sm-12","col-xs-12"],[1,"signup-boxes"],[1,"signup-box"],[4,"ngIf"],[1,"signup-title"],[1,"signup-form"],[3,"formGroup"],["class","alert alert-success",4,"ngIf"],["class","alert alert-info",4,"ngIf"],["class","alert alert-danger",4,"ngIf"],["type","text","placeholder","Email","formControlName","email","required","",1,"sign-input",3,"ngClass"],["emailInput",""],["class","invalid-feedback",4,"ngIf"],["type","password","placeholder","Password","formControlName","password","required","",1,"sign-input",3,"ngClass"],[1,"remembarme-box"],[1,"remeber-cont"],[1,"tool-check","fliht-check"],[1,"remember-lik"],["routerLink","/auth/forgot-password"],["type","submit",1,"custom-sign-btn","btn",3,"disabled","click"],[1,"have-account"],[1,"account-cont"],[1,"have-btn"],[3,"routerLink"],[1,"alert","alert-success"],[1,"alert","alert-info"],[1,"alert","alert-danger"],[1,"invalid-feedback"],["type","text","placeholder","OTP (check your mail)","formControlName","code","required","",1,"sign-input",3,"ngClass"],["codeInput",""],["type","submit",1,"custom-sign-btn","btn","mt-4",3,"disabled","click"],["type","submit","class","custom-sign-btn btn mt-3",3,"click",4,"ngIf"],["type","submit",1,"custom-sign-btn","btn","mt-3",3,"click"]],template:function(o,i){1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),e.YNc(6,Y,36,16,"ng-container",6),e.YNc(7,X,26,17,"ng-container",6),e.qZA()()()()()()),2&o&&(e.xp6(6),e.Q6J("ngIf",!i.isVerification),e.xp6(1),e.Q6J("ngIf",i.isVerification))},dependencies:[m.mk,m.O5,r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.sg,r.u,p.yS],styles:[".required[_ngcontent-%COMP%]{color:red}.is-invalid[_ngcontent-%COMP%]{border:solid 1px red}.invalid-feedback[_ngcontent-%COMP%]{display:inherit!important;margin-bottom:10px}.sign-input[_ngcontent-%COMP%]{margin-bottom:10px}.custom-sign-btn[_ngcontent-%COMP%]{position:relative!important;display:block!important;width:100%;color:#fff;border:1px solid #57b957;background-color:#57b957!important;box-shadow:0 5px 10px #57b95780;font-size:16px!important;text-align:center!important;text-decoration:none!important;font-family:SFUIDisplay-Bold!important;letter-spacing:.5px!important;padding:8px 0!important;border-radius:8px!important;transition:.5s all ease!important}.custom-sign-btn[_ngcontent-%COMP%]:hover{background-color:transparent!important;color:#57b957!important;transition:.5s all ease!important}"]});var b=a(28263),W=a(68951),$=a(19459);const ee=["emailInput"],ie=["codeInput"],te=["passwordInput"];function oe(t,o){if(1&t&&(e.TgZ(0,"div",18),e._uU(1),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.hij(" ",i.errorMsg," ")}}function re(t,o){if(1&t&&(e.TgZ(0,"div",19),e._uU(1),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.hij(" ",i.successMsg," ")}}function se(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Email is required."),e.qZA())}function ne(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Enter a valid email."),e.qZA())}function ae(t,o){if(1&t&&(e.TgZ(0,"div",20),e.YNc(1,se,2,0,"div",6),e.YNc(2,ne,2,0,"div",6),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.forgotPasswordForm.get("email").errors.required),e.xp6(1),e.Q6J("ngIf",i.forgotPasswordForm.get("email").errors.email)}}const l=function(t){return{"is-invalid":t}};function ce(t,o){if(1&t){const i=e.EpF();e.ynx(0),e.TgZ(1,"div",7)(2,"h2"),e._uU(3,"Recover your password"),e.qZA(),e.TgZ(4,"p"),e._uU(5,"Verify yourself and reset your password"),e.qZA()(),e.TgZ(6,"div",8)(7,"form",9),e.YNc(8,oe,2,1,"div",10),e.YNc(9,re,2,1,"div",11),e.TgZ(10,"label"),e._uU(11,"Email"),e.qZA(),e._UZ(12,"input",12,13),e.YNc(14,ae,3,2,"div",14),e.TgZ(15,"button",15),e.NdJ("click",function(){e.CHM(i);const n=e.oxw();return e.KtG(n.sendResetCode())}),e._uU(16," Send OTP "),e.qZA(),e.TgZ(17,"div",16)(18,"a",17),e._uU(19,"Go back to login"),e.qZA()()()(),e.BQk()}if(2&t){const i=e.oxw();e.xp6(7),e.Q6J("formGroup",i.forgotPasswordForm),e.xp6(1),e.Q6J("ngIf",i.isError),e.xp6(1),e.Q6J("ngIf",i.isSuccess),e.xp6(3),e.Q6J("ngClass",e.VKq(7,l,(i.submitted||i.forgotPasswordForm.get("email").touched)&&i.forgotPasswordForm.get("email").errors)),e.xp6(2),e.Q6J("ngIf",i.forgotPasswordForm.get("email").errors&&(i.submitted||i.forgotPasswordForm.get("email").touched)),e.xp6(1),e.Q6J("disabled",i.forgotPasswordForm.invalid&&i.submitted),e.xp6(3),e.Q6J("routerLink","/auth/signin")}}function de(t,o){if(1&t&&(e.TgZ(0,"div",18),e._uU(1),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.hij(" ",i.errorMsg," ")}}function le(t,o){if(1&t&&(e.TgZ(0,"div",19),e._uU(1),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.hij(" ",i.successMsg," ")}}function ge(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Email is required."),e.qZA())}function me(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Enter a valid email."),e.qZA())}function ue(t,o){if(1&t&&(e.TgZ(0,"div",20),e.YNc(1,ge,2,0,"div",6),e.YNc(2,me,2,0,"div",6),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("email").errors.required),e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("email").errors.email)}}function _e(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"OTP (from Mail) is required."),e.qZA())}function fe(t,o){if(1&t&&(e.TgZ(0,"div",20),e.YNc(1,_e,2,0,"div",6),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("code").errors.required)}}function pe(t,o){if(1&t){const i=e.EpF();e.TgZ(0,"button",24),e.NdJ("click",function(){e.CHM(i);const n=e.oxw(2);return e.KtG(n.sendResetCode(!0))}),e._uU(1," Resend OTP "),e.qZA()}}function ve(t,o){if(1&t){const i=e.EpF();e.ynx(0),e.TgZ(1,"div",7)(2,"h2"),e._uU(3,"Verify OTP"),e.qZA(),e.TgZ(4,"p"),e._uU(5,"Verify your account"),e.qZA()(),e.TgZ(6,"div",8)(7,"form",9),e.YNc(8,de,2,1,"div",10),e.YNc(9,le,2,1,"div",11),e.TgZ(10,"label"),e._uU(11,"Email"),e.qZA(),e._UZ(12,"input",12),e.YNc(13,ue,3,2,"div",14),e.TgZ(14,"label"),e._uU(15,"OTP (check your mail)"),e.qZA(),e._UZ(16,"input",21,22),e.YNc(18,fe,2,1,"div",14),e.TgZ(19,"button",15),e.NdJ("click",function(){e.CHM(i);const n=e.oxw();return e.KtG(n.verifyCode())}),e._uU(20," Verify OTP "),e.qZA(),e.YNc(21,pe,2,0,"button",23),e.TgZ(22,"div",16)(23,"a",17),e._uU(24,"Go back to login"),e.qZA()()()(),e.BQk()}if(2&t){const i=e.oxw();e.xp6(7),e.Q6J("formGroup",i.verificationForm),e.xp6(1),e.Q6J("ngIf",i.isError),e.xp6(1),e.Q6J("ngIf",i.isSuccess),e.xp6(3),e.Q6J("ngClass",e.VKq(10,l,(i.verifySubmitted||i.verificationForm.get("email").touched)&&i.verificationForm.get("email").errors)),e.xp6(1),e.Q6J("ngIf",i.verificationForm.get("email").errors&&(i.verifySubmitted||i.verificationForm.get("email").touched)),e.xp6(3),e.Q6J("ngClass",e.VKq(12,l,(i.verifySubmitted||i.verificationForm.get("code").touched)&&i.verificationForm.get("code").errors)),e.xp6(2),e.Q6J("ngIf",i.verificationForm.get("code").errors&&(i.verifySubmitted||i.verificationForm.get("code").touched)),e.xp6(1),e.Q6J("disabled",i.verificationForm.invalid&&i.verifySubmitted),e.xp6(2),e.Q6J("ngIf",i.isResendOtp),e.xp6(2),e.Q6J("routerLink","/auth/signin")}}function he(t,o){if(1&t&&(e.TgZ(0,"div",18),e._uU(1),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.hij(" ",i.errorMsg," ")}}function we(t,o){if(1&t&&(e.TgZ(0,"div",19),e._uU(1),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.hij(" ",i.successMsg," ")}}function xe(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Email is required."),e.qZA())}function be(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Enter a valid email."),e.qZA())}function Ze(t,o){if(1&t&&(e.TgZ(0,"div",20),e.YNc(1,xe,2,0,"div",6),e.YNc(2,be,2,0,"div",6),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.resetPasswordForm.get("email").errors.required),e.xp6(1),e.Q6J("ngIf",i.resetPasswordForm.get("email").errors.email)}}function Te(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Password is required."),e.qZA())}function Fe(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Password must be at least 8 characters."),e.qZA())}function Ce(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Password must be at max 25 characters."),e.qZA())}function Pe(t,o){if(1&t&&(e.TgZ(0,"div",20),e.YNc(1,Te,2,0,"div",6),e.YNc(2,Fe,2,0,"div",6),e.YNc(3,Ce,2,0,"div",6),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.resetPasswordForm.get("password").errors.required),e.xp6(1),e.Q6J("ngIf",i.resetPasswordForm.get("password").errors.minlength),e.xp6(1),e.Q6J("ngIf",i.resetPasswordForm.get("password").errors.maxlength)}}function Ie(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Password is required."),e.qZA())}function Se(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1,"Passwords must match."),e.qZA())}function qe(t,o){if(1&t&&(e.TgZ(0,"div",20),e.YNc(1,Ie,2,0,"div",6),e.YNc(2,Se,2,0,"div",6),e.qZA()),2&t){const i=e.oxw(2);e.xp6(1),e.Q6J("ngIf",i.resetPasswordForm.get("passwordConfirm").errors.required),e.xp6(1),e.Q6J("ngIf",i.resetPasswordForm.get("passwordConfirm").errors.passwordsNotMatching)}}function ye(t,o){if(1&t){const i=e.EpF();e.ynx(0),e.TgZ(1,"div",7)(2,"h2"),e._uU(3,"Reset password"),e.qZA(),e.TgZ(4,"p"),e._uU(5,"Reset your password"),e.qZA()(),e.TgZ(6,"div",8)(7,"form",9),e.YNc(8,he,2,1,"div",10),e.YNc(9,we,2,1,"div",11),e.TgZ(10,"label"),e._uU(11,"Email"),e.qZA(),e._UZ(12,"input",12),e.YNc(13,Ze,3,2,"div",14),e.TgZ(14,"label"),e._uU(15,"Password"),e.qZA(),e._UZ(16,"input",25),e.YNc(17,Pe,4,3,"div",14),e.TgZ(18,"label"),e._uU(19,"Confirm Password"),e.qZA(),e._UZ(20,"input",26),e.YNc(21,qe,3,2,"div",14),e.TgZ(22,"button",15),e.NdJ("click",function(){e.CHM(i);const n=e.oxw();return e.KtG(n.resetPassword())}),e._uU(23," Reset Password "),e.qZA(),e.TgZ(24,"div",16)(25,"a",17),e._uU(26,"Go back to login"),e.qZA()()()(),e.BQk()}if(2&t){const i=e.oxw();e.xp6(7),e.Q6J("formGroup",i.resetPasswordForm),e.xp6(1),e.Q6J("ngIf",i.isError),e.xp6(1),e.Q6J("ngIf",i.isSuccess),e.xp6(3),e.Q6J("ngClass",e.VKq(11,l,(i.resetSubmitted||i.resetPasswordForm.get("email").touched)&&i.resetPasswordForm.get("email").errors)),e.xp6(1),e.Q6J("ngIf",i.resetPasswordForm.get("email").errors&&(i.resetSubmitted||i.resetPasswordForm.get("email").touched)),e.xp6(3),e.Q6J("ngClass",e.VKq(13,l,(i.resetSubmitted||i.resetPasswordForm.get("password").touched)&&i.resetPasswordForm.get("password").errors)),e.xp6(1),e.Q6J("ngIf",i.resetPasswordForm.get("password").errors&&(i.resetSubmitted||i.resetPasswordForm.get("password").touched)),e.xp6(3),e.Q6J("ngClass",e.VKq(15,l,(i.resetSubmitted||i.resetPasswordForm.get("passwordConfirm").touched)&&i.resetPasswordForm.get("passwordConfirm").errors)),e.xp6(1),e.Q6J("ngIf",i.resetPasswordForm.get("passwordConfirm").errors&&(i.resetSubmitted||i.resetPasswordForm.get("passwordConfirm").touched)),e.xp6(1),e.Q6J("disabled",i.resetPasswordForm.invalid&&i.resetSubmitted),e.xp6(3),e.Q6J("routerLink","/auth/signin")}}class f{constructor(o,i,s){this.formBuilder=o,this.authService=i,this.toasterService=s,this.unsubscribeAll=new h.x}ngOnInit(){window.scrollTo(0,0),this.clear(),this.email="",this.code="",this.isVerification=!1,this.isResetPassword=!1,this.isResetSuccess=!1,this.isResendOtp=!1,this.submitted=!1,this.verifySubmitted=!1,this.resetSubmitted=!1,this.authService.sendIsPasswordResetSuccessfully(!1),this.forgotPasswordForm=this.formBuilder.group({email:["",[r.kI.required,r.kI.email]]}),this.verificationForm=this.formBuilder.group({email:["",[r.kI.required,r.kI.email]],code:["",[r.kI.required]]}),this.resetPasswordForm=this.formBuilder.group({email:["",[r.kI.required,r.kI.email]],password:["",[r.kI.required,r.kI.minLength(8),r.kI.maxLength(25)]],passwordConfirm:["",[r.kI.required,b.i]]}),this.resetPasswordForm.get("password").valueChanges.pipe((0,W.R)(this.unsubscribeAll)).subscribe(()=>{this.resetPasswordForm.get("passwordConfirm").updateValueAndValidity()})}sendResetCode(o=!1){this.clear(),this.submitted=!0,!this.forgotPasswordForm.invalid&&(!1===o?(this.isVerification=!1,this.isResetPassword=!1,this.isResendOtp=!1):setTimeout(()=>{this.formGroupDirective.resetForm(),this.verificationForm.patchValue({email:this.email}),this.verificationForm.get("email").disable()},0),this.email=this.forgotPasswordForm.controls.email.value,this.email=this.email.trim(),this.authService.forgotPassword(this.email).subscribe(i=>{i?"success"===i.status?(this.verificationForm.patchValue({email:this.email}),this.verificationForm.get("email").disable(),this.isSuccess=!0,this.successMsg="OTP is sent to your registered email.",this.isVerification=!0,this.isResendOtp=!1):i.message&&null!=i.message&&""!==i.message?(this.toasterService.showError(i.message,"Error"),this.clearSendResetCode()):(this.toasterService.showError("SendResetCode Unknown Error 1, try again","Error"),this.clearSendResetCode()):(this.toasterService.showError("SendResetCode Unknown Error 2, try again","Error"),this.clearSendResetCode())}))}verifyCode(){this.clear(),this.verifySubmitted=!0,!this.verificationForm.invalid&&(this.isResendOtp=!1,this.isResetPassword=!1,this.code=this.verificationForm.controls.code.value,this.code=this.code.trim(),this.authService.verifyForgotPasswordCode(this.code,this.email).subscribe(o=>{o?"success"===o.status?(this.resetPasswordForm.patchValue({email:this.email}),this.resetPasswordForm.get("email").disable(),this.isVerification=!1,this.isSuccess=!0,this.successMsg="OTP is verified!",this.isResetPassword=!0):o.message&&null!=o.message&&""!==o.message?(this.toasterService.showError(o.message,"Error"),this.clearVerifyCode()):(this.toasterService.showError("VerifyCode Unknown Error 2, try again","Error"),this.clearVerifyCode()):(this.toasterService.showError("VerifyCode Unknown Error 2, try again","Error"),this.clearVerifyCode())}))}resetPassword(){if(this.clear(),this.resetSubmitted=!0,this.resetPasswordForm.invalid)return;const o=new $.b;o.email=this.email,o.code=this.code;const i=this.resetPasswordForm.controls.password.value;o.newPassword=i.trim(),this.authService.resetPassword(o).subscribe(s=>{s?"success"===s.status?(this.isResetPassword=!1,this.isResetSuccess=!0,this.authService.sendIsPasswordResetSuccessfully(!0),this.authService.setUserLoggedOut()):s.message&&null!=s.message&&""!==s.message?(this.toasterService.showError(s.message,"Error"),this.clearResetPassword()):(this.toasterService.showError("ResetPassword Unknown Error 1, try again","Error"),this.clearResetPassword()):(this.toasterService.showError("ResetPassword Unknown Error 2, try again","Error"),this.clearResetPassword())})}clear(){this.isError=!1,this.errorMsg="",this.isSuccess=!1,this.successMsg=""}clearSendResetCode(){setTimeout(()=>this.formGroupDirective.resetForm(),0),this.emailInput.nativeElement.focus()}clearVerifyCode(){setTimeout(()=>{this.formGroupDirective.resetForm(),this.verificationForm.patchValue({email:this.email}),this.verificationForm.get("email").disable(),this.isResendOtp=!0},0),this.codeInput.nativeElement.focus()}clearResetPassword(){setTimeout(()=>{this.formGroupDirective.resetForm(),this.resetPasswordForm.patchValue({email:this.email}),this.resetPasswordForm.get("email").disable()},0),this.passwordInput.nativeElement.focus()}ngOnDestroy(){this.unsubscribeAll.next(0),this.unsubscribeAll.complete()}}f.\u0275fac=function(o){return new(o||f)(e.Y36(r.qu),e.Y36(w.e),e.Y36(x.M))},f.\u0275cmp=e.Xpm({type:f,selectors:[["app-forgot-password"]],viewQuery:function(o,i){if(1&o&&(e.Gf(ee,5),e.Gf(ie,5),e.Gf(te,5),e.Gf(r.sg,5)),2&o){let s;e.iGM(s=e.CRH())&&(i.emailInput=s.first),e.iGM(s=e.CRH())&&(i.codeInput=s.first),e.iGM(s=e.CRH())&&(i.passwordInput=s.first),e.iGM(s=e.CRH())&&(i.formGroupDirective=s.first)}},decls:9,vars:3,consts:[[1,"hero-signup"],[1,"container"],[1,"row"],[1,"col-lg-12","col-sm-12","col-xs-12"],[1,"signup-boxes"],[1,"signup-box"],[4,"ngIf"],[1,"signup-title"],[1,"signup-form"],[3,"formGroup"],["class","alert alert-danger",4,"ngIf"],["class","alert alert-success",4,"ngIf"],["type","text","placeholder","Email","formControlName","email","required","",1,"sign-input",3,"ngClass"],["emailInput",""],["class","invalid-feedback",4,"ngIf"],["type","submit",1,"custom-sign-btn","btn","mt-4",3,"disabled","click"],[1,"sign-in-link","mt-4"],[3,"routerLink"],[1,"alert","alert-danger"],[1,"alert","alert-success"],[1,"invalid-feedback"],["type","text","placeholder","OTP (check your mail)","formControlName","code","required","",1,"sign-input",3,"ngClass"],["codeInput",""],["type","submit","class","custom-sign-btn btn mt-3",3,"click",4,"ngIf"],["type","submit",1,"custom-sign-btn","btn","mt-3",3,"click"],["type","password","placeholder","Password","formControlName","password","required","",1,"sign-input",3,"ngClass"],["type","password","placeholder","Confirm Password","formControlName","passwordConfirm","required","",1,"sign-input",3,"ngClass"]],template:function(o,i){1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),e.YNc(6,ce,20,9,"ng-container",6),e.YNc(7,ve,25,14,"ng-container",6),e.YNc(8,ye,27,17,"ng-container",6),e.qZA()()()()()()),2&o&&(e.xp6(6),e.Q6J("ngIf",!i.isVerification&&!i.isResetPassword&&!i.isResetSuccess),e.xp6(1),e.Q6J("ngIf",i.isVerification&&!i.isResetPassword),e.xp6(1),e.Q6J("ngIf",!i.isVerification&&i.isResetPassword))},dependencies:[m.mk,m.O5,r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.sg,r.u,p.yS],styles:[".required[_ngcontent-%COMP%]{color:red}.is-invalid[_ngcontent-%COMP%]{border:solid 1px red}.invalid-feedback[_ngcontent-%COMP%]{display:inherit!important;margin-bottom:10px}.sign-input[_ngcontent-%COMP%]{margin-bottom:10px}.custom-sign-btn[_ngcontent-%COMP%]{position:relative!important;display:block!important;width:100%;color:#fff;border:1px solid #57b957;background-color:#57b957!important;box-shadow:0 5px 10px #57b95780;font-size:16px!important;text-align:center!important;text-decoration:none!important;font-family:SFUIDisplay-Bold!important;letter-spacing:.5px!important;padding:8px 0!important;border-radius:8px!important;transition:.5s all ease!important}.custom-sign-btn[_ngcontent-%COMP%]:hover{background-color:transparent!important;color:#57b957!important;transition:.5s all ease!important}.sign-in-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:16px;line-height:24px;color:#57b957;text-decoration:none;font-family:SFUIDisplay-Semibold;letter-spacing:.5px}"]});const Ue=[{path:"signin",component:_},{path:"signup",component:b.b},{path:"forgot-password",component:f}];class g{}g.\u0275fac=function(o){return new(o||g)},g.\u0275mod=e.oAB({type:g}),g.\u0275inj=e.cJS({imports:[m.ez,r.u5,r.UX,p.Bz.forChild(Ue)]})}}]);
//# sourceMappingURL=src_app_auth_auth_module_ts.js.map
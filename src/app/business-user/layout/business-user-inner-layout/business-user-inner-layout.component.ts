import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-business-user-inner-layout',
  templateUrl: './business-user-inner-layout.component.html',
  styleUrls: ['./business-user-inner-layout.component.scss']
})
export class BusinessUserInnerLayoutComponent implements OnInit {
  isBack: boolean;
  bookings: any[];
  pageTitle = 'Bookings';

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
    * Constructor
    *
    */
  constructor(private _authService: AuthService, private _service: CommonService,
    private _userService: UserService,
    private router: Router) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    console.log('this.router.url', this.router.url);
    if (this.router.url.includes('/business-user/booking-detail')) {
      this.isBack = true;
      //console.log()
    } else {
      this.isBack = false;
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
  * On init
  */
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  setTitle(title) {
    this.pageTitle = title;
  }

  get userName(): string {
    return this._authService.getUserEmail();
  }

  logout() {
    this._authService.setBusinessUserLoggedOut();
  }
  /**
  * On destroy
  */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(0);
    this._unsubscribeAll.complete();
  }
}

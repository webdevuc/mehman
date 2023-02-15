import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { FooterComponent } from 'src/app/footer/footer.component';

@Component({
  selector: 'app-business-user-detail-inner-layout',
  templateUrl: './business-user-detail-inner-layout.component.html',
  styleUrls: ['./business-user-detail-inner-layout.component.scss'],
})
export class BusinessUserDetailInnerLayoutComponent implements OnInit {
  isBack: boolean;
  bookings: any[];
  pageTitle = 'Bookings';

  // Private
  private unsubscribeAll: Subject<any>;
  footerComponent: Promise<Type<FooterComponent>>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();
    if (this.router.url.includes('/business-user/booking-detail')) {
      this.isBack = true;
      // console.log()
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
    if (!this.footerComponent) {
      this.footerComponent = import('src/app/footer/footer.component').then(({FooterComponent}) => FooterComponent);
    }
  }

  setTitle(title) {
    this.pageTitle = title;
  }

  get userName(): string {
    return this.authService.getUserEmail();
  }

  logout() {
    this.authService.setBusinessUserLoggedOut();
  }

  /**
   * On destroy
   */
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next(0);
    this.unsubscribeAll.complete();
  }
}

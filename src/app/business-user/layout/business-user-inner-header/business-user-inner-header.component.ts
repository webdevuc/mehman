import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-business-user-inner-header',
  templateUrl: './business-user-inner-header.component.html',
  styleUrls: ['./business-user-inner-header.component.scss'],
})
export class BusinessUserInnerHeaderComponent implements OnInit {
  get isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  get userName(): string {
    return this.authService.getName();
  }

  get isHome(): boolean {
    return this.checkRoute();
  }

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(private authService: AuthService, private router: Router) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void { }

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

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  checkRoute() {
    return this.router.url === '/' ? false : true;
  }
}

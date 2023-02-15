import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-business-user-main-header',
  templateUrl: './business-user-main-header.component.html',
  styleUrls: ['./business-user-main-header.component.scss'],
})
export class BusinessUserMainHeaderComponent implements OnInit, OnDestroy {
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
    this.authService.loggedOut();
  }

  /**
   * On destroy
   */
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Constant } from 'src/app/models/const';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  email: string;
  phone: string;

  get isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  get userName(): string {
    return this.authService.getName();
  }

  get role(): string {
    return this.authService.getRole();
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
    this.email = Constant.email;
    this.phone = Constant.phone;
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

  onNavigate(url) {
    window.open(url, "_blank");
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  checkRoute() {
    return this.router.url === '/' ? false : true;
  }
}

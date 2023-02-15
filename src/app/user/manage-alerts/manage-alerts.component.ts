import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-manage-alerts',
  templateUrl: './manage-alerts.component.html',
  styleUrls: ['./manage-alerts.component.scss'],
})
export class ManageAlertsComponent implements OnInit, OnDestroy {
  alerts: any[];

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(
    private authService: AuthService) {
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
  }

  get userName(): string {
    return this.authService.getUserEmail();
  }

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
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Common } from 'src/app/models/common';
import { BookingStatus } from 'src/app/models/enums.model';
import { ToasterService } from 'src/app/services/toastr-service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-business-user-bookings',
  templateUrl: './business-user-bookings.component.html',
  styleUrls: ['./business-user-bookings.component.scss'],
})
export class BusinessUserBookingsComponent implements OnInit {
  bookings: any[];
  isError: boolean;
  errorMessage: string;
  bookingStatus: BookingStatus;

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toasterService: ToasterService,
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
    this.getBookings();
  }

  get userName(): string {
    return this.authService.getUserEmail();
  }

  getBookingStatus(rowData) {
    return Common.getBookingStatus(rowData.status);
  }

  getPaymentType(rowData) {
    return Common.getPaymentType(rowData.paymentType);
  }

  logout() {
    this.authService.loggedOut();
  }

  getBookings() {
    this.userService.getBookings().subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.bookings = response.data;
            console.log('bookings', response.data);
          }
        } else {
          if (response.message) {
            this.toasterService.showError(
              'GetBookings Err 1: Unknown; Try Again',
              'Error'
            );
            this.errorMessage = response.message;
          } else {
            this.toasterService.showError(
              'GetBookings Err 1: Unknown; Try Again',
              'Error'
            );
            // this.errorMessage = 'GetBookings Err 1: Unknown; Try Again';
            // this.isError = true;
          }
        }
      } else {
        this.toasterService.showError(
          'GetBookings Err 2: Unknown; Try Again',
          'Error'
        );
        this.errorMessage = 'GetBookings Err 2: Unknown; Try Again';
        this.isError = true;
      }
    });
  }

  getBookingDetails(event: any) {
    this.router.navigate(['/business-user/booking-detail', event.key.id]);
  }

  bookingDetails(id: any) {
    this.router.navigate(['/travel-agent/booking-detail', id]);
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

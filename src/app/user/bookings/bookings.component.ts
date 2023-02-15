import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { BookingStatus, PaymentType } from 'src/app/models/enums.model';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit, OnDestroy {
  bookings: any[];
  isError: boolean;
  errorMessage: string;
  bookingStatus: BookingStatus;

  // Private
  private unsubscribeAll: Subject<any>;

  constructor(
    private authService: AuthService,
    private service: CommonService,
    private userService: UserService
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
    switch (rowData.status) {
      case 1:
        return BookingStatus[1];
      case 2:
        return BookingStatus[2];
      case 3:
        return BookingStatus[3];
      case 4:
        return BookingStatus[4];
      case 5:
        return BookingStatus[5];
      case 6:
        return BookingStatus[6];
    }
  }

  getPaymentType(rowData) {
    switch (rowData.paymentType) {
      case 1:
        return PaymentType[1];
    }
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
            this.errorMessage = response.message;
          } else {
            this.errorMessage = 'GetBookings Err 1: Unknown; Try Again';
            this.isError = true;
          }
        }
      } else {
        this.errorMessage = 'GetBookings Err 2: Unknown; Try Again';
        this.isError = true;
      }
    });
  }

  bookingDetails(id: any) {
    console.log(id);
    //this.router.navigate(['/travel-agent/booking-detail', id]);
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

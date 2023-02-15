import { TravelAgentService } from './../comman-service/travel-agent.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Common } from 'src/app/models/common';
import { BookingStatus } from 'src/app/models/enums.model';
import { ToasterService } from 'src/app/services/toastr-service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-travel-agent-bookings',
  templateUrl: './travel-agent-bookings.component.html',
  styleUrls: ['./travel-agent-bookings.component.scss'],
})
export class TravelAgentBookingsComponent implements OnInit {
  bookings: any[];
  airLines: any[];
  isError: boolean;
  errorMessage: string;
  bookingStatus: BookingStatus;
  loading = true;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toasterService: ToasterService,
    private router: Router,
    private travelAgentService: TravelAgentService
  ) { }

  ngOnInit(): void {
    this.getAirlines();
    window.scrollTo(0, 0);
    // this.getBookings();
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
            this.loading = false;
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
    this.router.navigate(['/travel-agent/booking-detail', event.key.id]);
  }

  bookingDetails(id: any) {
    this.router.navigate(['/travel-agent/booking-detail', id]);
  }

  getAirlines() {
    this.travelAgentService.getAirlines().subscribe(response => {
      if (response.data) {
        this.airLines = response.data;
        this.getBookings();
      }
    }, erroor => { });
  }


  getAirLineName(airCode) {
    let name;
    // console.log('airLines', this.airLines)
    this.airLines.forEach(element => {
      console.log(airCode == element.code)
      if (airCode == element.code) {
          
        name = element.name;
      }
    });
    return name;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Common } from 'src/app/models/common';
import { ToasterService } from 'src/app/services/toastr-service';
import { UserService } from 'src/app/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-user-booking-detail',
  templateUrl: './business-user-booking-detail.component.html',
  styleUrls: ['./business-user-booking-detail.component.scss'],
})
export class BusinessUserBookingDetailComponent implements OnInit {
  id: any;
  booking: any;
  trip: any;
  flightSegments: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe((params: Params) => (this.id = params.id));
    this.getBooking(this.id);
  }

  getBookingStatus(rowData) {
    const bookingStatus = Common.getBookingStatus(rowData);
    return bookingStatus;
  }

  getPaymentStatus(rowData) {
    const paymentStatus = Common.getPaymentStatus(rowData);
    return paymentStatus;
  }

  getPaymentType(rowData) {
    const paymentType = Common.getPaymentType(rowData);
    return paymentType;
  }

  underConstruction() {
    const html =
      'Please <a href=\'/contact-us\'>contact us</a> to know status of your request';
    Swal.fire({
      title: 'Under Construction',
      html,
      icon: 'info',
    });
  }

  requestClick() {
    this.underConstruction();
  }

  // addPaymentClick(){
  //   Swal.fire('Under Construction - Please contact us to know status of your request')
  // }

  // requestCancelClick(){
  //   Swal.fire('Under Construction - Please' +  '<a  href="#">contact us</a>' + ' to know status of your request')
  // }

  getBooking(id: any) {
    this.userService.getBooking(id).subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.booking = response.data;
            if (this.booking.trip) {
              this.trip = this.booking.trip;
              this.flightSegments = this.trip.flightSegments;
            }
          }
        } else {
          if (response.message) {
            this.toasterService.showError(
              'GetBooking Err 1: Unknown; Try Again',
              'Error'
            );
            // this.errorMessage = response.message;
          } else {
            this.toasterService.showError(
              'GetBooking Err 1: Unknown; Try Again',
              'Error'
            );
            // this.errorMessage = 'GetBookings Err 1: Unknown; Try Again';
            // this.isError = true;
          }
        }
      } else {
        this.toasterService.showError(
          'GetBooking Err 2: Unknown; Try Again',
          'Error'
        );
        // this.errorMessage = 'GetBookings Err 2: Unknown; Try Again';
        // this.isError = true;
      }
    });
  }

  requestSchedule() {
    Swal.fire({
      title: 'Under Construction',
      text: 'Please contact us to know Status of your request!',
      icon: 'info',
    }).then((result) => {
      if (result.value) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  requestCancelation() {
    Swal.fire({
      title: 'Under Construction',
      text: 'Please contact us to know Status of your request!',
      icon: 'info',
    }).then((result) => {
      if (result.value) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  addPayment() {
    Swal.fire({
      title: 'Under Construction',
      text: 'Please contact us to know Status of your request!',
      icon: 'info',
    }).then((result) => {
      if (result.value) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
}

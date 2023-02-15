import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-confirmed-booking',
  templateUrl: './confirmed-booking.component.html',
  styleUrls: ['./confirmed-booking.component.scss']
})
export class ConfirmedBookingComponent implements OnInit {
  pnr: string;
  errMsg: string;
  role: string;
  isError: boolean;
  constructor() { }

  ngOnInit(): void {

    let confirmBooking = JSON.parse(sessionStorage.getItem('confirmedbooking'))
    this.pnr = confirmBooking.pnr;
    this.role = confirmBooking.role;
    this.isError = Boolean(JSON.parse(confirmBooking.isError));
    this.errMsg = confirmBooking.errMsg;
    sessionStorage.removeItem('confirmedbooking');
  }

}

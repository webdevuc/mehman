import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FlightModel } from '../models/flight.model';
import { FlightSegmentModel } from '../models/flight-segment.model';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-review-booking',
  templateUrl: './review-booking.component.html',
  styleUrls: ['./review-booking.component.scss'],
})
export class ReviewBookingComponent implements OnInit, OnDestroy {
  flightId: string;
  flights: Array<FlightModel>;
  flight: FlightModel;
  isFlightFound: boolean;
  baggage: string;
  departureSegments: Array<FlightSegmentModel>;
  returnSegments: Array<FlightSegmentModel>;

  // Private
  // private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(private route: ActivatedRoute, private router: Router) {
    // Set the private defaults
    // this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe((params) => {
      this.flightId = params.get('id');
    });
    if (!this.flightId || !sessionStorage.getItem('selectedFlight')) {
      this.router.navigate(['/']);
    }
    // this.flights = new Array<FlightModel>();
    // this.flights = JSON.parse(sessionStorage.getItem('flights'));
    // if (!this.flights || this.flights.length <= 0) {
    //   this.router.navigate(['/']);
    // }
    // const selectedFlight = this.flights.filter(
    //   (x) => x.flightId === this.flightId
    // )[0];
    const selectedFlight = JSON.parse(sessionStorage.getItem('selectedFlight'));
    console.log(selectedFlight);
    if (!selectedFlight) {
      this.isFlightFound = false;
    } else {
      this.isFlightFound = true;
      this.flight = new FlightModel();
      this.flight = selectedFlight;
      console.log(this.flight);
      this.departureSegments = new Array<FlightSegmentModel>();
      this.returnSegments = new Array<FlightSegmentModel>();
      this.departureSegments = this.flight.flightSegments.filter(
        (x) => x.tripType === 'Departure'
      );

      this.returnSegments = this.flight.flightSegments.filter(
        (x) => x.tripType === 'Return'
      );

    }
  }

  formatMoneyBase(value: string = ''): string {
    //return value.length ? formatCurrency(parseFloat(value.replace(/\D/g, '')), 'en', '$').replace('$', '') : '';
    return value.length ? formatCurrency(parseFloat(value.replace(/\D/g, '')), 'en', '$').replace('$', '') : '';

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    // this.unsubscribeAll.next(0);
    // this.unsubscribeAll.complete();
  }
}

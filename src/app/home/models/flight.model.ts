import { FlightSegmentModel } from './flight-segment.model';
import { FareDetailsModel } from './fare-details.model';
import * as moment from 'moment';
import { FarePricesModel } from './fare-prices.model';
export class FlightModel {
  flightId: string;
  originLocation: string;
  destinationLocation: string;
  leaveDate: Date;
  returnDate?: Date;
  tripType: string;
  travelClass: string;
  totalFare: number;
  sabreTotalFare:number;
  currencyCode: string;
  airline: string;
  airlineCode: string;
  airlineLogo: string;
  airlineType:string;
  flightSegments: Array<FlightSegmentModel>;
  fareDetails: FareDetailsModel;
  flightMini: FlightMiniModel;
  isDuplicate: boolean;
  paymentMethod: string;
  farePrices: FarePricesModel[];
}

export class FlightMiniModel {
  flightId: string;
  airlineLogo: string;
  totalFare: number;
  currencyCode: string;
  departure: FlightMiniDetailsModel;
  return: FlightMiniDetailsModel;
  totalElapsedTime: number;
}

export class FlightMiniDetailsModel {
  departureDateTime: Date;
  arrivalDateTime: Date;
  originLocation: string;
  destinationLocation: string;
  departureDateTimeFormat: string;
  arrivalDateTimeFormat: string;
  totalDuration: string;
  travelRoute: string;
  stops?: number;
}

import { BaggageModel } from './baggage.model';

export class FlightSegmentModel {
  carrierCode: string;
  flightNumber: string;
  elapsedTime: number;
  departureAirport: string;
  arrivalAirport: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  fareBasis: string;
  fareClass: string;
  travelClassType: string;
  avalibility: number;
  tripType: string;
  isRefundable: boolean;
  changePlanesNote: string;
  baggage: BaggageModel;
  duration: string;
  travelClass: string;
  departureDateFormat: string;
  departureTimeFormat: string;
  arrivalDateFormat: string;
  arrivalTimeFormat: string;
}

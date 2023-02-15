import { BaggageInfoEntityModel } from './baggage-info-entity.model';

export class FlightSegmentEntityModel {
  id: number;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  fareClass: string;
  duration: number;
  remarks: string;
  createdOn: Date;
  modifiedOn: Date;
  baggageInfo: BaggageInfoEntityModel;
}

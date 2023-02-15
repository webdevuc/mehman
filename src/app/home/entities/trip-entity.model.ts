import { FlightSegmentEntityModel } from './flight-segment-entity.model';
import { PassengerInfoEntityModel } from './passenger-info-entity.model';
import { ContactInfoEntityModel } from './contact-info-entity.model';
import { FareDetailsEntityModel } from './fare-details-entity.model';

export class TripEntityModel {
  id: number;
  originLocation: string;
  destinationLocation: string;
  tripType: string;
  leaveDate: Date;
  returnDate?: Date;
  travelClass: string;
  adultCount: number;
  childCount?: number;
  infantCount?: number;
  airline: string;
  totalFare: number;
  sabreTotalFare:number;
  currencyCode: string;
  remarks: string;
  createdOn: Date;
  modifiedOn: Date;
  flightSegments: Array<FlightSegmentEntityModel>;
  passengerInfos: Array<PassengerInfoEntityModel>;
  contactInfo: ContactInfoEntityModel;
  fareDetails: FareDetailsEntityModel;
}

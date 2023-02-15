export class FlightFiltersModel {
  originLocation: string;
  destinationLocation: string;
  leaveDate: Date;
  returnDate?: Date;
  isDirectFlightOnly: boolean;
  travelClass: string;
  adult: number;
  child?: number;
  infant?: number;
  multiCities: string;
}

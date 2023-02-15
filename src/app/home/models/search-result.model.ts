import { FlightModel } from './flight.model';

export class SearchResultModel {
  flights: Array<FlightModel>;
  airlineFliters: Array<AirlineFliterModel>;
  stopFilters: Array<StopFilterModel>;
  bestFlight: FlightModel;
  cheapestFlight: FlightModel;
  fastestFlight: FlightModel;
  altDaysFlights: Array<FlightModel>;
}

export class AirlineFliterModel {
  code: string;
  name: string;
  logo: string;
}

export class StopFilterModel {
  text: string;
  value: string;
}

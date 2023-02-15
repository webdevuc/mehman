export class RefundPenalityModel {
  isRefundable: boolean;
  adultBeforeDeparture?: number;
  adultAfterDeparture?: number;
  childBeforeDeparture?: number;
  childAfterDeparture?: number;
  infantBeforeDeparture?: number;
  infantAfterDeparture?: number;
  currencyCode: string;
}

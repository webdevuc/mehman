export class RefundPenalityEntityModel {
  id: number;
  isRefundable: boolean;
  adultBeforeDeparture?: number;
  adultAfterDeparture?: number;
  childBeforeDeparture?: number;
  childAfterDeparture?: number;
  infantBeforeDeparture?: number;
  infantAfterDeparture?: number;
  remarks: string;
  createdOn: Date;
  modifiedOn: Date;
}

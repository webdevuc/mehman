export class ExchangePenalityEntityModel {
  id: number;
  isChangeable: boolean;
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

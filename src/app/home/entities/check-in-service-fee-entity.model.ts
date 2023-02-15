export class CheckInServiceFeeEntityModel {
  id: number;
  offlineCancellationServiceFee?: number;
  onlineCancellationServiceFee?: number;
  reschedulingServiceFee?: number;
  internationalFlightGeneralServiceFee: number;
  domesticFlightGeneralServiceFee: number;
  remarks: string;
  createdOn: Date;
  modifiedOn: Date;
}


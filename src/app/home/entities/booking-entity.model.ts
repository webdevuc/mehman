import { BookingStatus, PaymentType } from '../../models/enums.model';
import { TripEntityModel } from './trip-entity.model';

export class BookingEntityModel {
  id: number;
  status: BookingStatus;
  pNR: string;
  expiredOn: Date;
  remarks: string;
  createdOn: Date;
  modifiedOn: Date;
  trip: TripEntityModel;
  paymentType: PaymentType;
  branchId?: number;
  airlineType:string;
}

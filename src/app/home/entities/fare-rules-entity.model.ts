import { ExchangePenalityEntityModel } from './exchange-penality-entity.model';
import { RefundPenalityEntityModel } from './refund-penality-entity.model';
import { CheckInServiceFeeEntityModel } from './check-in-service-fee-entity.model';

export class FareRulesEntityModel {
  id: number;
  remarks: string;
  createdOn: Date;
  modifiedOn: Date;
  exchangePenality: ExchangePenalityEntityModel;
  refundPenality: RefundPenalityEntityModel;
  checkInServiceFee: CheckInServiceFeeEntityModel;
}

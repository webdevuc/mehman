import { ExchangePenalityModel } from './exchange-penality.model';
import { RefundPenalityModel } from './refund-penality.model';
import { CheckinServiceFeeModel } from './checkin-service-fee.model';

export class FareRulesModel {
  exchangePenality: ExchangePenalityModel;
  refundPenality: RefundPenalityModel;
  checkinServiceFee: CheckinServiceFeeModel;
}

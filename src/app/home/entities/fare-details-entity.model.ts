import { FarePricesEntityModel } from './fare-prices-entity.model';
import { FareRulesEntityModel } from './fare-rules-entity.model';

export class FareDetailsEntityModel {
  id: number;
  remarks: string;
  createdOn: Date;
  modifiedOn: Date;
  farePrices: FarePricesEntityModel;
  fareRules: FareRulesEntityModel;
}

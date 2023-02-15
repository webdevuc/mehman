export class FarePricesEntityModel {
  id: number;
  adultCount: number;
  childCount?: number;
  infantCount?: number;
  adultBaseFare: number;
  childBaseFare?: number;
  infantBaseFare?: number;
  adultFeeAndTax: number;
  childFeeAndTax?: number;
  infantFeeAndTax?: number;
  remarks: string;
  createdOn: Date;
  modifiedOn: Date;
}

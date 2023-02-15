export class FarePricesModel {
  adultCount: number;
  childCount?: number;
  infantCount?: number;
  adultBaseFare: number;
  childBaseFare?: number;
  infantBaseFare?: number;
  adultFeeAndTax: number;
  childFeeAndTax?: number;
  infantFeeAndTax?: number;
  grandTotal: number;
  currencyCode: string;
  totalBaseFare: number;
  adultEquivAmount: number;
  childEquivAmount?: number;
  infantEquivAmount?: number;
  totalFeeAndTax: number;
  adultTaxAmount: number;
  childTaxAmount?: number;
  infantTaxAmount?: number;
  familyCode:string;
  familyDescription:string;
  familyName:string;
  cabinName:string;
}

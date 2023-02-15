export class BaggageInfoEntityModel {
  id: number;
  adultCabin?: string;
  childCabin?: string;
  infantCabin?: string;
  adultCheckIn?: number;
  childCheckIn?: number;
  infantCheckIn?: number;
  unit: string;
  description1: string;
  description2: string;
  tripType: string;
  remarks: string;
  createdOn: Date;
  modifiedOn: Date;
  familyName:string;
  familyDescription:string;
  cabinName:string;
}

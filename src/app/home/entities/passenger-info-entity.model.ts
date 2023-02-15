import { PassangerType } from '../../models/enums.model';

export class PassengerInfoEntityModel {
  id: number;
  salutation: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  passportIssuingCountry: string;
  passportExpiry: Date;
  gender: string;
  title:string;
  nationality: string;
  passangerType: PassangerType;
  mealPreference: string;
  seatPreference: string;
  remarks: string;
  createdOn: Date;
  modifiedOn: Date;
}

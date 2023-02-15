import { BookingStatus, PaymentStatus, PaymentType, TripType } from './enums.model';

export class Common {

    static getPaymentType(paymentType: any) {
        switch (paymentType) {
          case 1:
            return PaymentType[1];
        }
    }

    static getPaymentStatus(paymentStatus: any) {
        switch (paymentStatus) {
          case 1:
            return PaymentStatus[1];
        }
    }

    static getBookingStatus(bookingStatus: any) {
        switch (bookingStatus) {
          case 1:
            return BookingStatus[1];
            case 2:
              return BookingStatus[2];
            case 3:
              return BookingStatus[3];
            case 4:
              return BookingStatus[4];
            case 5:
              return BookingStatus[5];
            case 6:
              return BookingStatus[6];
        }
    }

    static getTravelClassCode(name: string): string {
      switch (name) {
        case 'Premium First':
          return 'P';
        case 'First':
          return 'F';
        case 'Premium Business':
          return 'J';
        case 'Business':
          return 'C';
        case 'Premium Economy':
          return 'S';
        case 'Economy':
          return 'Y';
        default:
          return 'N/A';
      }
    }

    static getTravelClassName(code: string): string {
      switch (code) {
        case 'P':
          return 'Premium First';
        case 'F':
          return 'First';
        case 'J':
          return 'Premium Business';
        case 'C':
          return 'Business';
        case 'S':
          return 'Premium Economy';
        case 'Y':
          return 'Economy';
        default:
          return 'N/A';
      }
    }

    static getTripTypeName(tripType: TripType): string {
      switch (tripType) {
        case TripType.OneWay:
          return 'One Way';
        case TripType.RoundTrip:
          return 'Round Trip';
        case TripType.MultiCity:
          return 'Multi City';
        default:
          return 'N/A';
      }
    }

    static getTripType(tripTypeName: string): TripType {
      switch (tripTypeName) {
        case 'One Way':
          return TripType.OneWay;
        case 'Round Trip':
          return TripType.RoundTrip;
        case 'Multi City':
          return TripType.MultiCity;
        default:
          return null;
      }
    }
}

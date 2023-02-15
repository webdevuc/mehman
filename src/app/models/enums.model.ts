export enum BookingStatus {
  Pending = 1,
  Booked,
  Expired,
  Canceled,
  Rejected,
  Confirmed
}

export enum PassangerType {
  Adult = 1,
  Child,
  Infant
}

export enum TripType {
  RoundTrip= 1,
  OneWay = 2 ,
  MultiCity = 3
}

export enum PaymentType {
  PayAtBranch = 1,
  PayPro = 2,
  Credit = 3
}

export enum PaymentStatus {
  Pending = 1,
  Paid
}

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { FlightModel } from '../models/flight.model';
import { BookingEntityModel } from '../entities/booking-entity.model';
import { TripEntityModel } from '../entities/trip-entity.model';
import { FlightSegmentEntityModel } from '../entities/flight-segment-entity.model';
import { BaggageInfoEntityModel } from '../entities/baggage-info-entity.model';
import { PassengerInfoEntityModel } from '../entities/passenger-info-entity.model';
import { PassangerType } from '../../models/enums.model';
import { ContactInfoEntityModel } from '../entities/contact-info-entity.model';
import { FareDetailsEntityModel } from '../entities/fare-details-entity.model';
import { FarePricesEntityModel } from '../entities/fare-prices-entity.model';
import { FareRulesEntityModel } from '../entities/fare-rules-entity.model';
import { ExchangePenalityEntityModel } from '../entities/exchange-penality-entity.model';
import { RefundPenalityEntityModel } from '../entities/refund-penality-entity.model';
import { CheckInServiceFeeEntityModel } from '../entities/check-in-service-fee-entity.model';
// import { HomeService } from '../shared/home.service';
import { FlightSegmentModel } from '../models/flight-segment.model';
import { Country, Gender, MealPreference } from './traveller-details';
import { TravellerDetailsService } from './traveller-details.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-traveller-details',
  templateUrl: './traveller-details.component.html',
  styleUrls: ['./traveller-details.component.scss'],
})
export class TravellerDetailsComponent implements OnInit {
  flightId: string;
  flights: Array<FlightModel>;
  flight: FlightModel;
  isFlightFound: boolean;
  adultCount: number;
  childCount: number;
  infantCount: number;
  travellersForm: FormGroup;
  submitted: boolean;
  genders: Gender[] = [
    { id: 1, name: 'Male', value: 'Male' },
    { id: 2, name: 'Female', value: 'Female' },
  ];
  titles: any[] = [
    { name: 'Mr', value: 'Mr' },
    { name: 'Ms', value: 'Ms' },
    { name: 'Mrs', value: 'Mrs' },
    { name: 'Miss', value: 'Miss' },
  ];
  passportIssuingCountries: Country[];
  countryCodes: Country[];
  mealPreferences: MealPreference[] = [
    { name: 'Vegetarian Jain Meal', value: 'Vegetarian Jain Meal' },
    { name: 'Kosher Meal', value: 'Kosher Meal' },
    { name: 'Moslem Meal', value: 'Moslem Meal' },
    { name: 'Baby Meal', value: 'Baby Meal' },
    {
      name: 'Hindu (Non Vegetarian) Meal',
      value: 'Hindu (Non Vegetarian) Meal',
    },
    { name: 'Vegetarian Hindu Meal', value: 'Vegetarian Hindu Meal' },
  ];
  maxAdultDateOfBirth: Date = moment().subtract(12, 'years').toDate();
  minChildDateOfBirth: Date = moment().subtract(12, 'years').toDate();
  maxChildDateOfBirth: Date = moment().subtract(2, 'years').toDate();
  minInfantDateOfBirth: Date = moment().subtract(2, 'years').toDate();
  maxInfantDateOfBirth: Date = moment().toDate();

  isValidAdultsDateOfBirth: boolean;
  isValidChildsDateOfBirth: boolean;
  isValidInfantsDateOfBirth: boolean;
  isValidAdultsPassportExpiry: boolean;
  isValidChildsPassportExpiry: boolean;
  isValidInfantsPassportExpiry: boolean;

  departureSegments: Array<FlightSegmentModel>;
  returnSegments: Array<FlightSegmentModel>;

  @ViewChildren('AdultDateOfBirth')
  adultsDateOfBirth: QueryList<any>;
  @ViewChildren('ChildDateOfBirth')
  childsDateOfBirth: QueryList<any>;
  @ViewChildren('InfantDateOfBirth')
  infantsDateOfBirth: QueryList<any>;
  @ViewChildren('AdultPassportExpiry')
  adultsPassportExpiry: QueryList<any>;
  @ViewChildren('ChildPassportExpiry')
  childsPassportExpiry: QueryList<any>;
  @ViewChildren('InfantPassportExpiry')
  infantsPassportExpiry: QueryList<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private travellerDetailsService: TravellerDetailsService,
    private datePipe: DatePipe,
  ) {
    this.travellerDetailsService.getCountryCodes().then((response) => {
      this.passportIssuingCountries = JSON.parse(JSON.stringify(response));
      this.countryCodes = JSON.parse(JSON.stringify(response));
      // this.passportIssuingCountries.forEach(
      //   (country) => (country.code = country.name)
      // );
      this.countryCodes.forEach(
        (country) => (country.name = country.name + '(' + country.dial_code + ')')
      );
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /*
   * On init
   */
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.submitted = false;
    this.isValidAdultsDateOfBirth = true;
    this.isValidChildsDateOfBirth = true;
    this.isValidInfantsDateOfBirth = true;
    this.isValidAdultsPassportExpiry = true;
    this.isValidChildsPassportExpiry = true;
    this.isValidInfantsPassportExpiry = true;
    this.flightId = this.route.snapshot.params['id'];
    if (!this.flightId || !sessionStorage.getItem('selectedFlight')) {
      this.router.navigate(['/']);
    }
    // this.flights = new Array<FlightModel>();
    // this.flights = JSON.parse(sessionStorage.getItem('flights'));
    // if (!this.flights || this.flights.length <= 0) {
    //   this.router.navigate(['/']);
    // }
    // const selectedFlight = this.flights.filter(
    //   (x) => x.flightId === this.flightId
    // )[0];
    const selectedFlight = JSON.parse(sessionStorage.getItem('selectedFlight'));
    if (!selectedFlight) {
      this.isFlightFound = false;
    } else {
      this.isFlightFound = true;
      this.flight = new FlightModel();
      this.flight = selectedFlight;      
      this.departureSegments = new Array<FlightSegmentModel>();
      this.returnSegments = new Array<FlightSegmentModel>();
      this.departureSegments = this.flight.flightSegments.filter(
        (x) => x.tripType == 'Departure'
      );
      this.returnSegments = this.flight.flightSegments.filter(
        (x) => x.tripType == 'Return'
      );
      
      this.getTravellers();
      this.setForms();
    }
    $(document).ready(function () {
      // Add minus icon for collapse element which is open by default
      $('.collapse.show').each(function () {
        $(this)
          .prev('.card-header')
          .find('.fa')
          .addClass('fa-minus')
          .removeClass('fa-plus');
      });

      // Toggle plus minus icon on show hide of collapse element
      $('.collapse')
        .on('show.bs.collapse', function () {
          $(this)
            .prev('.card-header')
            .find('.fa')
            .removeClass('fa-plus')
            .addClass('fa-minus');
        })
        .on('hide.bs.collapse', function () {
          $(this)
            .prev('.card-header')
            .find('.fa')
            .removeClass('fa-minus')
            .addClass('fa-plus');
        });
    });
  }

  // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event) {
    const inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z0-9-_ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  getTravellers() {
    if (
      this.flight &&
      this.flight.fareDetails &&
      this.flight.fareDetails.farePrices
    ) {
      if (this.flight.fareDetails.farePrices.adultCount) {
        this.adultCount = this.flight.fareDetails.farePrices.adultCount;
      } else {
        this.adultCount = 0;
      }
      if (this.flight.fareDetails.farePrices.childCount) {
        this.childCount = this.flight.fareDetails.farePrices.childCount;
      } else {
        this.childCount = 0;
      }
      if (this.flight.fareDetails.farePrices.infantCount) {
        this.infantCount = this.flight.fareDetails.farePrices.infantCount;
      } else {
        this.infantCount = 0;
      }
    } else {
      this.adultCount = 0;
      this.childCount = 0;
      this.infantCount = 0;
    }
  }

  setForms() {
    this.travellersForm = this.formBuilder.group({
      adultForms: this.formBuilder.array([]),
      childForms: this.formBuilder.array([]),
      infantForms: this.formBuilder.array([]),
      contactInfoForm: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        countryCode: ['+92'],
        mobileNumber: ['', [Validators.required, Validators.maxLength(50)]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(50)],
        ],
      }),
    });

    if (this.adultCount && this.adultCount > 0) {
      for (let i = 0; i < this.adultCount; i++) {
        const adults = this.travellersForm.controls.adultForms as FormArray;
        const adultForm: FormGroup = this.formBuilder.group({
          firstName: ['', [Validators.required, Validators.maxLength(50)]],
          lastName: ['', [Validators.required, Validators.maxLength(50)]],
          dateOfBirth: ['', Validators.required],
          gender_adult: ['Male', Validators.required],
          title: ['', Validators.required],
          passportNumber: ['', [Validators.maxLength(50),Validators.required]],
          passportIssuingCountry: ['',Validators.required],
          countryCode: ['Pakistan(+92)'],
          passportExpiry: new FormControl('',Validators.required),
          mealPreference: [''],
        });
        adults.insert(adults.length, adultForm);
      }
    } else {
      this.travellersForm.removeControl('adultForms');
    }

    if (this.childCount && this.childCount > 0) {
      for (let i = 0; i < this.childCount; i++) {
        const childs = this.travellersForm.controls.childForms as FormArray;
        const childForm: FormGroup = this.formBuilder.group({
          firstName: ['', [Validators.required, Validators.maxLength(50)]],
          lastName: ['', [Validators.required, Validators.maxLength(50)]],
          dateOfBirth: ['', Validators.required],
          gender_child: ['Male', Validators.required],
          passportNumber: ['', [Validators.maxLength(50),Validators.required]],
          passportIssuingCountry: ['',Validators.required],
          passportExpiry: new FormControl('',Validators.required),
          mealPreference: [''],
        });

        childs.insert(childs.length, childForm);
      }
    } else {
      this.travellersForm.removeControl('childForms');
    }

    if (this.infantCount && this.infantCount > 0) {
      for (let i = 0; i < this.infantCount; i++) {
        const infants = this.travellersForm.controls.infantForms as FormArray;
        const infantForm: FormGroup = this.formBuilder.group({
          firstName: ['', [Validators.required, Validators.maxLength(50)]],
          lastName: ['', [Validators.required, Validators.maxLength(50)]],
          dateOfBirth: ['', Validators.required],
          gender_infant: ['Male', Validators.required],
          passportNumber: ['', [Validators.required, Validators.maxLength(50)]],
          passportIssuingCountry: ['',Validators.required],
          passportExpiry: new FormControl('',Validators.required),
          mealPreference: [''],
        });
        infants.insert(infants.length, infantForm);
      }
    } else {
      this.travellersForm.removeControl('infantForms');
    }
  }

  changeAdultsDateOfBirth() {
    this.isValidAdultsDateOfBirth = true;
    if (this.adultsDateOfBirth && this.adultsDateOfBirth.length > 0) {
      for (const adult of this.adultsDateOfBirth) {
        if (!adult.isValid) {
          this.isValidAdultsDateOfBirth = false;
          break;
        }
      }
    }
  }

  changeChildsDateOfBirth() {
    this.isValidChildsDateOfBirth = true;
    if (this.childsDateOfBirth && this.childsDateOfBirth.length > 0) {
      for (const child of this.childsDateOfBirth) {
        if (!child.isValid) {
          this.isValidChildsDateOfBirth = false;
          break;
        }
      }
    }
  }

  changeInfantsDateOfBirth() {
    this.isValidInfantsDateOfBirth = true;
    if (this.infantsDateOfBirth && this.infantsDateOfBirth.length > 0) {
      for (const infant of this.infantsDateOfBirth) {
        if (!infant.isValid) {
          this.isValidInfantsDateOfBirth = false;
          break;
        }
      }
    }
  }

  changeAdultsPassportExpiry() {
    this.isValidAdultsPassportExpiry = true;
    if (this.adultsPassportExpiry && this.adultsPassportExpiry.length > 0) {
      for (const adult of this.adultsPassportExpiry) {
        if (!adult.isValid) {
          this.isValidAdultsPassportExpiry = false;
          break;
        }
      }
    }
  }

  changeChildsPassportExpiry() {
    this.isValidChildsPassportExpiry = true;
    if (this.childsPassportExpiry && this.childsPassportExpiry.length > 0) {
      for (const child of this.childsPassportExpiry) {
        if (!child.isValid) {
          this.isValidChildsPassportExpiry = false;
          break;
        }
      }
    }
  }

  changeInfantsPassportExpiry() {
    this.isValidInfantsPassportExpiry = true;
    if (this.infantsPassportExpiry && this.infantsPassportExpiry.length > 0) {
      for (const infant of this.infantsPassportExpiry) {
        if (!infant.isValid) {
          this.isValidInfantsPassportExpiry = false;
          break;
        }
      }
    }
  }

  tripModel() {
    const trip = new TripEntityModel();
    trip.originLocation = this.flight.originLocation;
    trip.destinationLocation = this.flight.destinationLocation;
    trip.tripType = this.flight.tripType;
    trip.leaveDate = this.flight.leaveDate;
    trip.returnDate = this.flight.returnDate;
    trip.travelClass = this.flight.travelClass;
    if (this.adultCount && this.adultCount > 0) {
      trip.adultCount = this.adultCount;
    }
    if (this.childCount && this.childCount > 0) {
      trip.childCount = this.childCount;
    }
    if (this.infantCount && this.infantCount > 0) {
      trip.infantCount = this.infantCount;
    }
    trip.airline = this.flight.airlineCode;
    trip.totalFare = this.flight.totalFare;
    trip.sabreTotalFare = this.flight.sabreTotalFare;
    trip.currencyCode = this.flight.currencyCode;
    return trip;
  }
  
  flightSegmentsModel() {
    const flightSegments = new Array<FlightSegmentEntityModel>();
    for (const segment of this.flight.flightSegments) {
      const seg = new FlightSegmentEntityModel();
      seg.flightNumber = segment.flightNumber;
      seg.departureAirport = segment.departureAirport;
      seg.arrivalAirport = segment.arrivalAirport;
      seg.departureDateTime = segment.departureDateTime;
      seg.arrivalDateTime = segment.arrivalDateTime;
      seg.fareClass = segment.fareClass;
      seg.duration = segment.elapsedTime;
      seg.baggageInfo = new BaggageInfoEntityModel();
      seg.baggageInfo.adultCabin = segment.baggage.adultCabin;
      seg.baggageInfo.childCabin = segment.baggage.childCabin;
      seg.baggageInfo.infantCabin = segment.baggage.infantCabin;
      seg.baggageInfo.adultCheckIn = segment.baggage.adultCheckIn;
      seg.baggageInfo.childCheckIn = segment.baggage.childCheckIn;
      seg.baggageInfo.infantCheckIn = segment.baggage.infantCheckIn;
      seg.baggageInfo.unit = segment.baggage.unit;
      seg.baggageInfo.description1 = segment.baggage.description1;
      seg.baggageInfo.description2 = segment.baggage.description2;
      seg.baggageInfo.tripType = segment.baggage.tripType;
      if ( this.flight.airlineType === 'LCC')
      {
        seg.baggageInfo.familyDescription =this.flight.fareDetails.farePrices.familyDescription;
        seg.baggageInfo.familyName =this.flight.fareDetails.farePrices.familyName;
        seg.baggageInfo.cabinName =this.flight.fareDetails.farePrices.cabinName;  
        if (!seg.fareClass)
          seg.fareClass='S';
      }
      flightSegments.push(seg);
    }

    return flightSegments;
  }

  passengerInfoModel() {
    const passengerInfos = new Array<PassengerInfoEntityModel>();
    if (this.adultCount && this.adultCount > 0) {
      for (const adult of this.travellersForm.get('adultForms')['controls']) {
        const passenger = new PassengerInfoEntityModel();
        passenger.firstName = adult.controls.firstName.value.trim();
        passenger.lastName = adult.controls.lastName.value.trim();
        passenger.dateOfBirth = this.datePipe.transform(adult.controls.dateOfBirth.value, 'yyyy-MM-dd') ;
        passenger.passportNumber = adult.controls.passportNumber.value.trim();
        passenger.passportIssuingCountry =
          adult.controls.passportIssuingCountry.value;
        passenger.passportExpiry =
          adult.controls.passportExpiry.value === ''
            ? undefined
            : adult.controls.passportExpiry.value;
        passenger.gender = adult.controls.gender_adult.value;
        passenger.title = adult.controls.title.value;
        passenger.passangerType = PassangerType.Adult;
        passenger.mealPreference = adult.controls.mealPreference.value;
        passengerInfos.push(passenger);
      }
    }

    if (this.childCount && this.childCount > 0) {
      for (const child of this.travellersForm.get('childForms')['controls']) {
        const passenger = new PassengerInfoEntityModel();
        passenger.firstName = child.controls.firstName.value.trim();
        passenger.lastName = child.controls.lastName.value.trim();
        passenger.dateOfBirth = this.datePipe.transform(child.controls.dateOfBirth.value, 'yyyy-MM-dd')  ;
        passenger.passportNumber = child.controls.passportNumber.value.trim();
        passenger.passportIssuingCountry = child.controls.passportIssuingCountry.value;
        passenger.passportExpiry =
          child.controls.passportExpiry.value === ''
            ? undefined
            : child.controls.passportExpiry.value;
        passenger.gender = child.controls.gender_child.value;
        passenger.passangerType = PassangerType.Child;
        passenger.mealPreference = child.controls.mealPreference.value;
        passengerInfos.push(passenger);
      }
    }

    if (this.infantCount && this.infantCount > 0) {
      for (const infant of this.travellersForm.get('infantForms')['controls']) {
        const passenger = new PassengerInfoEntityModel();
        passenger.firstName = infant.controls.firstName.value.trim();
        passenger.lastName = infant.controls.lastName.value.trim();
        passenger.dateOfBirth =this.datePipe.transform(infant.controls.dateOfBirth.value, 'yyyy-MM-dd')  ; 
        passenger.passportNumber = infant.controls.passportNumber.value.trim();
        passenger.passportIssuingCountry = infant.controls.passportIssuingCountry.value;
        passenger.passportExpiry =
          infant.controls.passportExpiry.value === ''
            ? undefined
            : infant.controls.passportExpiry.value;
        passenger.gender = infant.controls.gender_infant.value;
        passenger.passangerType = PassangerType.Infant;
        passenger.mealPreference = infant.controls.mealPreference.value;
        passengerInfos.push(passenger);
      }
    }

    return passengerInfos;
  }

  save() {
    this.submitted = true;
    if (this.travellersForm.invalid) {
      return;
    }
    const booking = new BookingEntityModel();
    const trip = this.tripModel();

    const flightSegments = this.flightSegmentsModel();
    trip.flightSegments = flightSegments;

    const passengerInfos = this.passengerInfoModel();
    trip.passengerInfos = passengerInfos;

    const contactInfo = new ContactInfoEntityModel();
    const contactForm = this.travellersForm.get('contactInfoForm').value;
    contactInfo.firstName = contactForm.firstName.trim();
    contactInfo.lastName = contactForm.lastName.trim();
    contactInfo.countryCode = contactForm.countryCode;
    contactInfo.mobileNumber = contactForm.mobileNumber.trim();
    contactInfo.email = contactForm.email.trim();
    trip.contactInfo = contactInfo;

    const fareDetails = new FareDetailsEntityModel();
    const farePrices = new FarePricesEntityModel();
    const fp = this.flight.fareDetails.farePrices;
    farePrices.adultCount = fp.adultCount;
    farePrices.childCount = fp.childCount;
    farePrices.infantCount = fp.infantCount;
    farePrices.adultBaseFare = fp.adultBaseFare;
    farePrices.childBaseFare = fp.childBaseFare;
    farePrices.infantBaseFare = fp.infantBaseFare;
    farePrices.adultFeeAndTax = fp.adultFeeAndTax;
    farePrices.childFeeAndTax = fp.childFeeAndTax;
    farePrices.infantFeeAndTax = fp.infantFeeAndTax;
    fareDetails.farePrices = farePrices;

    const fareRules = new FareRulesEntityModel();
    const exchangePenality = new ExchangePenalityEntityModel();
    const ep = this.flight.fareDetails.fareRules.exchangePenality;
    exchangePenality.isChangeable = ep.isChangeable;
    exchangePenality.adultBeforeDeparture = ep.adultBeforeDeparture;
    exchangePenality.adultAfterDeparture = ep.adultAfterDeparture;
    exchangePenality.childBeforeDeparture = ep.childBeforeDeparture;
    exchangePenality.childAfterDeparture = ep.childAfterDeparture;
    exchangePenality.infantBeforeDeparture = ep.infantBeforeDeparture;
    exchangePenality.infantAfterDeparture = ep.infantAfterDeparture;
    fareRules.exchangePenality = exchangePenality;

    const refundPenality = new RefundPenalityEntityModel();
    const rp = this.flight.fareDetails.fareRules.refundPenality;
    refundPenality.isRefundable = rp.isRefundable;
    refundPenality.adultBeforeDeparture = rp.adultBeforeDeparture;
    refundPenality.adultAfterDeparture = rp.adultAfterDeparture;
    refundPenality.childBeforeDeparture = rp.childBeforeDeparture;
    refundPenality.childAfterDeparture = rp.childAfterDeparture;
    refundPenality.infantBeforeDeparture = rp.infantBeforeDeparture;
    refundPenality.infantAfterDeparture = rp.infantAfterDeparture;
    fareRules.refundPenality = refundPenality;

    const checkInServiceFee = new CheckInServiceFeeEntityModel();
    const csf = this.flight.fareDetails.fareRules.checkinServiceFee;
    checkInServiceFee.offlineCancellationServiceFee =
      csf.offlineCancellationServiceFee;
    checkInServiceFee.onlineCancellationServiceFee =
      csf.onlineCancellationServiceFee;
    checkInServiceFee.reschedulingServiceFee = csf.reschedulingServiceFee;
    checkInServiceFee.internationalFlightGeneralServiceFee =
      csf.internationalFlightGeneralServiceFee;
    checkInServiceFee.domesticFlightGeneralServiceFee =
      csf.domesticFlightGeneralServiceFee;
    fareRules.checkInServiceFee = checkInServiceFee;
    fareDetails.fareRules = fareRules;
    trip.fareDetails = fareDetails;

    booking.airlineType=this.flight.airlineType;
    booking.trip = trip;
    sessionStorage.removeItem('currentBooking');
    sessionStorage.setItem('currentBooking', JSON.stringify(booking));
    // this.homeService.sendBooking(booking);
    this.router.navigate(['/make-payment/' + this.flight.flightId]);
  }
}

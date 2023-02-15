import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { forkJoin, from, groupBy, mergeMap, of, Subject, toArray } from 'rxjs';
import { HomeService } from '../shared/home.service';
import { BookingEntityModel } from '../entities/booking-entity.model';
import { FlightModel } from '../models/flight.model';
import { FlightSegmentModel } from '../models/flight-segment.model';
import { PassengerInfoEntityModel } from '../entities/passenger-info-entity.model';
import { PassangerType, PaymentType } from '../../models/enums.model';
import { BranchEntityModel } from '../entities/branch-entity.model';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ToasterService } from 'src/app/services/toastr-service';
import { PrimeNGConfig } from 'primeng/api';
import * as CryptoJS from 'crypto-js';
import { conforms } from 'lodash';

// declare var $: any;

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss'],
})
export class MakePaymentComponent implements OnInit, OnDestroy {
  flightId: string;
  flights: Array<FlightModel>;
  flight: FlightModel;
  isFlightFound: boolean;
  booking: BookingEntityModel;
  pnr: string;
  role: string;
  isError: boolean;
  errMsg: string;
  departureSegments: Array<FlightSegmentModel>;
  returnSegments: Array<FlightSegmentModel>;

  adults: Array<PassengerInfoEntityModel>;
  childs: Array<PassengerInfoEntityModel>;
  infants: Array<PassengerInfoEntityModel>;

  branches: BranchEntityModel[] = [];
  paymentForm: FormGroup;
  submitted: boolean;
  isAcceptedTermsAndConditions: boolean;
  branchByCitys: any;
  brancheData: any;
  branchAddress: any;
  branchPhone: any;
  displayDialogBox: boolean;
  bookingDate: Date;
  IsPayLaterVisible: boolean;
  selectedIndex = 0;
  transactionFormType: any = 'initiate-transaction';
  alphaTransactionStatus = 'in-process'
  serviceCharge: number;
  alphaHandshakePaymentForm: FormGroup
  alphaPaymentForm: FormGroup
  alphaMakePaymentForm: FormGroup
  transactionTypes = [
    { key: 'Alfa Wallet', value: '1' },
    { key: 'Alfalah Bank Account', value: '2' },
    { key: 'Credit/Debit Card', value: '3' }
  ]
  // Private
  // private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService: ToasterService,
    private primengConfig: PrimeNGConfig
  ) {
    // Set the private defaults
    // this.unsubscribeAll = new Subject();
    this.getBranches();
    this.paymentForm = this.formBuilder.group({
      city: ['', Validators.required],
      branch: ['', Validators.required],
      paymentMethod: ['']
    });

    this.alphaHandshakePaymentForm = this.formBuilder.group({
      HS_ChannelId: ['1002', Validators.required],
      HS_MerchantId: ['19480', Validators.required],
      HS_StoreId: ['024948', Validators.required],
      HS_ReturnURL: ['http://localhost:4200/', Validators.required],
      HS_MerchantHash: ['0aFsbiT8uYBQKWZnuLKZt6g5RfxkELSRZsghVafx7SM=', Validators.required],
      HS_MerchantUsername: ['ufivam', Validators.required],
      HS_MerchantPassword: ['6PUqoDFNBnxvFzk4yqF7CA==', Validators.required],
      HS_TransactionReferenceNumber: [this.getRndInteger(0, 99999), Validators.required],
      HS_RequestHash: [null, Validators.required],
      // HS_IsRedirectionRequest: ["1"],
    });
    this.alphaPaymentForm = this.formBuilder.group({
      ChannelId: ['1002', Validators.required],
      MerchantId: ['19480', Validators.required],
      StoreId: ['024948', Validators.required],
      MerchantHash: ['0aFsbiT8uYBQKWZnuLKZt6g5RfxkELSRZsghVafx7SM=', Validators.required],
      MerchantUsername: ['ufivam', Validators.required],
      MerchantPassword: ['6PUqoDFNBnxvFzk4yqF7CA==', Validators.required],
      ReturnURL: ['http://localhost:4200/', Validators.required],
      Currency: ['PKR', Validators.required],
      AuthToken: [null, Validators.required],
      TransactionTypeId: ['', Validators.required],
      TransactionReferenceNumber: [this.alphaHandshakePaymentForm.value.HS_TransactionReferenceNumber, Validators.required],
      TransactionAmount: ['', Validators.required],
      MobileNumber: ['', Validators.required],
      AccountNumber: ['', Validators.required],
      Country: [164, Validators.required],
      EmailAddress: ['', Validators.required],
      RequestHash: [null],
    });
    this.alphaMakePaymentForm = this.formBuilder.group({
      ChannelId: ['1002', Validators.required],
      MerchantId: ['19480', Validators.required],
      StoreId: ['024948', Validators.required],
      MerchantHash: ['0aFsbiT8uYBQKWZnuLKZt6g5RfxkELSRZsghVafx7SM=', Validators.required],
      MerchantUsername: ['ufivam', Validators.required],
      MerchantPassword: ['6PUqoDFNBnxvFzk4yqF7CA==', Validators.required],
      ReturnURL: ['http://localhost:4200/', Validators.required],
      Currency: ['PKR', Validators.required],
      AuthToken: [null, Validators.required],
      TransactionTypeId: ['', Validators.required],
      TransactionReferenceNumber: [this.alphaHandshakePaymentForm.value.HS_TransactionReferenceNumber, Validators.required],
      SMSOTAC: [''],
      EmailOTAC: [''],
      SMSOTP: ['', Validators.required],
      HashKey: ['', Validators.required],
      RequestHash: [null],
      IsOTP: [true, Validators.required],
    });
    this.alphaHandshakePaymentForm.get('HS_RequestHash').setValue(this.hashMaker(this.alphaHandshakePaymentForm.value, 'HS_RequestHash'))
  }

  tabValueCheck(e) {
    if (e.index === 5) {
      this.handShake()
    }
  }

  handShake() {
    this.homeService.handShake(this.alphaHandshakePaymentForm.value).subscribe(res => {
      if (res?.success) {
        this.alphaPaymentForm.get('AuthToken').setValue(res.AuthToken)
      } else {
        this.alphaTransactionStatus = 'error'
        this.toasterService.showError('There are some error using Alpha Payment.Try to refresh Page or contact to Service provider', 'Error');

      }
    })
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  hashMaker(obj, valueSetAttribute) {
    let requestHash = ''
    for (const [key, value] of Object.entries(obj)) {
      if (key !== valueSetAttribute) {
        requestHash = `${requestHash}${key}=${value}&`
      }
    }
    console.log('merged string=', requestHash)
    const key1 = 'YTXESY4pN37MqJEj';
    const key2 = '5746310103472707';

    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(requestHash.substr(0, requestHash.length -
      1)), CryptoJS.enc.Utf8.parse(key1), {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(key2),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
  }

  initiateTransaction() {

    this.submitted = true;
    this.alphaPaymentForm.get('RequestHash').setValue(this.hashMaker(this.alphaPaymentForm.value, 'RequestHash'))
    this.homeService.initiateTransaction(this.alphaPaymentForm.value).subscribe(res => {
      if (res?.success) {
        console.log('response', res);
        this.alphaMakePaymentForm.patchValue(this.alphaPaymentForm.value)
        this.alphaPaymentForm.get('HashKey').setValue(res.HashKey)
        this.transactionFormType = 'otp-form'
      } else {
        this.toasterService.showError('There are some error using Alpha Payment.Try to refresh Page or contact to Service provider', 'Error');
        this.alphaTransactionStatus = 'error'

      }
    })
  }

  makeTransaction() {

    this.submitted = true;
    this.alphaPaymentForm.get('RequestHash').setValue(this.hashMaker(this.alphaPaymentForm.value, 'RequestHash'))
    this.homeService.makeTransaction(this.alphaPaymentForm.value).subscribe(res => {
      if (res?.success) {
        console.log('response', res);
        this.alphaMakePaymentForm.patchValue(this.alphaPaymentForm.value)
        this.alphaPaymentForm.get('HashKey').setValue(res.HashKey)
        this.transactionFormType = 'otp-form'
        this.alphaTransactionStatus = res.transaction_status

      } else {
        this.alphaTransactionStatus = 'error'
        this.toasterService.showError('There are some error using Alpha Payment.Try to refresh Page or contact to Service provider', 'Error');
      }
    })
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.clear();
    this.role = this.authService.getRole();
    this.primengConfig.ripple = true;
    this.submitted = false;
    this.isAcceptedTermsAndConditions = false;
    this.booking = new BookingEntityModel();
    this.flightId = this.route.snapshot.params.id;
    this.bookingDate = new Date();
    this.bookingDate.setDate(this.bookingDate.getDate() + 3);
    this.serviceCharge = 500;
    // this.route.paramMap.subscribe((params) => {
    //   this.flightId = params.get('id');
    // });
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
        (x) => x.tripType === 'Departure'
      );
      this.returnSegments = this.flight.flightSegments.filter(
        (x) => x.tripType === 'Return'
      );

      this.IsPayLaterVisible =
        new Date(this.flight.leaveDate) < this.bookingDate;
      if (sessionStorage.getItem('currentBooking')) {
        this.getCurrentSessionBooking();
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  getCurrentSessionBooking() {
    if (sessionStorage.getItem('currentBooking')) {
      this.booking = JSON.parse(sessionStorage.getItem('currentBooking'));
      if (!this.booking) {
        this.router.navigate(['/']);
      } else {
        if (
          this.booking.trip.passengerInfos &&
          this.booking.trip.passengerInfos.length > 0
        ) {
          const adults = this.booking.trip.passengerInfos.filter(
            (x) => x.passangerType === PassangerType.Adult
          );
          if (adults && adults.length > 0) {
            this.adults = new Array<PassengerInfoEntityModel>();
            this.adults = adults;
          }
          const childs = this.booking.trip.passengerInfos.filter(
            (x) => x.passangerType === PassangerType.Child
          );
          if (childs && childs.length > 0) {
            this.childs = new Array<PassengerInfoEntityModel>();
            this.childs = childs;
          }
          const infants = this.booking.trip.passengerInfos.filter(
            (x) => x.passangerType === PassangerType.Infant
          );
          if (infants && infants.length > 0) {
            this.infants = new Array<PassengerInfoEntityModel>();
            this.infants = infants;
          }
        }
      }
    }
  }

  getBranches() {
    this.homeService.getAllBranches().subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.branches = response.data;
            this.generateCityByBranch();
          }
        } else {
          if (response.message) {
            this.toasterService.showError(response.message, 'Error');
            // alert(response.message);
          } else {
            this.toasterService.showError(
              'Branches are not loaded! Please try again.',
              'Error'
            );
          }
          // alert("Branches are not loaded! Please try again.");
        }
      } else {
        this.toasterService.showError(
          'Branches are not loaded! Please try again.',
          'Error'
        );
      }
      // alert("Branches are not loaded! Please try again.");
    });
  }

  generateCityByBranch() {
    const source = from(this.branches);
    const groupByAirlineOffer = source
      .pipe(
        groupBy(
          (data) => data.city,
          (p) => p
        ),
        mergeMap((group) =>
          forkJoin({
            key: of(group.key),
            bData: group.pipe(toArray()),
          })
        )
      )
      .pipe(toArray());

    const subscribe = groupByAirlineOffer.subscribe((val) => {
      this.branchByCitys = JSON.parse(JSON.stringify(val));
    });
  }
  onChangeCity(event) {
    this.brancheData = this.branchByCitys.filter(
      (val) => val.key === event.value
    )[0].bData;
  }

  onChangeBranch(event) {
    const cData = this.brancheData.filter(
      (val) => val.id === parseInt(event.value)
    )[0];
    this.branchAddress = cData.branchAddress;
    this.branchPhone = cData.mobileNo;
  }

  confirmBooking(payOption: any) {
    this.submitted = true;
    
    if (
      !this.isAcceptedTermsAndConditions
    ) {
      return;
    } 
   
    if (payOption === 'PayAtBranch') {
      this.booking.paymentType = PaymentType.PayAtBranch;
      this.booking.branchId = this.paymentForm.controls.branch.value;
      this.booking.trip.totalFare = this.booking.trip.totalFare + this.serviceCharge;      
    }

    if (payOption === 'PayPro') {
      this.booking.paymentType = PaymentType.PayPro;
    }

    if (payOption === 'Credit') {
      this.booking.branchId = null;
      this.booking.trip.totalFare = this.booking.trip.totalFare;
      this.booking.paymentType = PaymentType.Credit;
    }

    this.homeService.saveBooking(this.booking).subscribe((response) => {
      if (response) {        
        if (response.status === 'success') {
          if (response.data) {
            this.pnr = response.data;
            //this.displayDialogBox = true;
            sessionStorage.removeItem('flights');
            const  confirmBooking = {
              pnr: this.pnr,
              role: this.role,
              isError: this.isError,
              errMsg: this.errMsg,
            };
            sessionStorage.setItem('confirmedbooking', JSON.stringify(confirmBooking));
            this.router.navigate(['confirmed-bookig']);            
            // $('#exampleModalCenter').modal({
            //   backdrop: 'static',
            //   keyboard: false,
            // });
          }
        } else {
          this.isError = true;
          if (response.message) {
            // this.toasterService.showError(response.message, 'Error');
            this.errMsg = response.message;
            const  confirmBooking = {
              pnr: this.pnr,
              role: this.role,
              isError: this.isError,
              errMsg: this.errMsg,
            };
            sessionStorage.setItem('confirmedbooking', JSON.stringify(confirmBooking));            
            this.router.navigate(['confirmed-bookig']);   
            //this.displayDialogBox = true;
            sessionStorage.removeItem('flights');
          } else {
            this.toasterService.showError(
              'Confirm Booking Unknown Error 1, try again',
              'Error'
            );
          }
        }
      } else {
        this.isError = true;
        this.toasterService.showError(
          'Confirm Booking Unknown Error 1, try again',
          'Error'
        );
      }
    });
  }

  closePopup() {
    this.displayDialogBox = false;
    if (this.pnr) {
      const role = this.authService.getRole();
      if (role === 'TravelAgent') {
        this.router.navigate(['/travel-agent/bookings']);
      } else if (role === 'User') {
        this.router.navigate(['/user/bookings']);
      } else {
        this.router.navigate(['/auth/signin']);
      }
    } else {
      this.router.navigate(['/search-results']);
    }
  }
  // closePopup() {
  //   $('#exampleModalCenter').modal('hide');
  //   if (this.pnr) {
  //     const role = this.authService.getRole();
  //     if (role === 'TravelAgent') {
  //       this.router.navigate(['/travel-agent/bookings']);
  //     } else if (role === 'User') {
  //       this.router.navigate(['/user/bookings']);
  //     } else {
  //       this.router.navigate(['/auth/signin']);
  //     }
  //   }
  // }

  clear() {
    this.isError = false;
    this.errMsg = '';
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // this.homeService.sendBooking(null);
    // Unsubscribe from all subscriptions
    // this.unsubscribeAll.next(0);
    // this.unsubscribeAll.complete();
  }
}

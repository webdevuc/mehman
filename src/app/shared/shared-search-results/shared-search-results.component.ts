import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
  OnDestroy,
  Input,
  ViewChild,
  Inject,
  LOCALE_ID,
  EventEmitter,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Lightpick from 'src/assets/js/lightpick.min.js';
import * as _ from 'lodash';

import { ToasterService } from 'src/app/services/toastr-service';
import { Common } from 'src/app/models/common';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { AirportEntity } from 'src/app/home/entities/airport-entity.model';
import { FlightFiltersModel } from 'src/app/home/models/flight-filters.model';
import { FlightModel } from 'src/app/home/models/flight.model';
import {
  SearchResultModel,
  AirlineFliterModel,
  StopFilterModel,
} from 'src/app/home/models/search-result.model';
import { HomeService } from 'src/app/home/shared/home.service';
import { TripType } from 'src/app/models/enums.model';
import { SharedMulticityComponent } from '../shared-multicity/shared-multicity.component';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { DecimalPipe, formatNumber } from '@angular/common';
declare var $: any;
declare function Home_init();

@Component({
  selector: 'app-shared-search-results',
  templateUrl: './shared-search-results.component.html',
  styleUrls: ['./shared-search-results.component.scss'],
})
export class SharedSearchResultsComponent
  implements OnInit, AfterViewInit, OnDestroy {
    isShow:boolean;
    isShowed = true;
    isdisplayed:boolean
  get Travellers(): number {
    return (
      // tslint:disable-next-line: radix
      parseInt(this.adult?.toString()) +
      parseInt(this.child?.toString()) +
      parseInt(this.infant?.toString())
    );
  }

  get TripTypeName(): string {
    return Common.getTripTypeName(this.tripType);
    // return this.commonService.getTripTypeName(this.tripType);
  }

  constructor(
    private homeService: HomeService,
    private router: Router,
    private toasterService: ToasterService,
    private authService: AuthService,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string,
    private route: ActivatedRoute
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.getAirports();
    if (this.router.getCurrentNavigation().extras.state !== undefined) {
      this.searchfilters = JSON.stringify(this.router.getCurrentNavigation().extras.state);
    }
  }

  // Filters
  flights: any[] = [];
  altDaysFlights: any[] = [];
  tripType: TripType;
  originLocation: string;
  destinationLocation: string;
  travelClass: string;
  adult = 0;
  child = 0;
  infant: number;
  leaveDate: Date;
  returnDate?: Date;
  selectedLeaveDate: Date;
  selectedReturnDate?: Date;
  multiCities: string;
  multiCitiesValues: any = [];
  showDefaultSearchRow = true;
  dropDownMultiSearch = false;
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  tripTypeEnum = TripType;
  departureCity: string;
  arrivalCity: string;
  departureAirportName: string;
  departureTitle: string;
  arrivalAirportName: string;
  arrivalTitle: string;

  airports: Array<AirportEntity>;
  departureAirportResults: Array<AirportEntity>;
  arrivalAirportResults: Array<AirportEntity>;

  // setup before functions
  typingTimer: any; // timer identifier
  doneTypingInterval = 1000; // time in ms (1 second)

  travelClassName: string;
  singlePicker: any;
  rangePicker: any;

  searchResult: SearchResultModel;
  flightResult: any;
  // flights: Array<FlightModel>;
  isSearchResultsError: boolean;
  isSearchResults: boolean;
  searchResultsErrMsg: string;

  airlineFilter: string;
  stopFilter: string;
  arrangeFilter: string;
  responsiveOptions;
  isLoaded: boolean;

  bestFlight: FlightModel;
  cheapestFlight: FlightModel;
  fastestFlight: FlightModel;
  popularCities = [];
  isSuggest = true;
  selectedRange = false;
  list: any[] = [];
  locationResult:[];

  multiCityFromName = 'Select City';

  @Input() searchfilters: string;
  @Output() searchResultEvent = new EventEmitter<string>();
  @ViewChild(SharedMulticityComponent)
  sharedMulticityData: SharedMulticityComponent;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.hideDepartureAirportResults();
      this.hideArrivalAirportResults();
    }
  }

  ngOnInit(): void {

    setTimeout(() => {
      Home_init();
    }, 1000);
    window.scrollTo(0, 0);
    this.searchResult = new SearchResultModel();
    this.searchResult.flights = new Array<FlightModel>();
    this.searchResult.airlineFliters = new Array<AirlineFliterModel>();
    this.clear();
    this.tripType = TripType.OneWay;

    this.originLocation = 'LHE';
    this.departureCity = 'Lahore';
    this.arrivalCity = 'Dubai';
    this.departureAirportName = 'LHE, Alama Iqbal International...';
    this.departureTitle = 'LHE, Alama Iqbal International Airport Pakistan';
    this.destinationLocation = 'DXB';
    this.arrivalAirportName = 'DXB, Dubai International Airpo...';
    this.arrivalTitle = 'DXB, Dubai International Airport United Arab Emirates';
    this.departureAirportResults = new Array<AirportEntity>();
    this.arrivalAirportResults = new Array<AirportEntity>();
    this.travelClass = 'Y'; // Economy
    this.travelClassName = Common.getTravelClassName(this.travelClass);
    this.adult = 1;
    this.child = 0;
    this.infant = 0;
    this.leaveDate = moment().add(1, 'days').toDate();
    this.airlineFilter = 'ALL';
    this.stopFilter = 'ALL';
    this.arrangeFilter = 'lowest_fare';
    //this.singleDatePicker(true);
    this.isLoaded = false;

    if (this.searchfilters === undefined) {
      if (this.route.snapshot.queryParams['destinationLocation'] && this.route.snapshot.queryParams['originLocation']) {
        const multiCityData = [];
        const filters = {
          trip: this.GetTripName(this.route.snapshot.queryParams['trip']),
          originLocation: this.route.snapshot.queryParams['originLocation'],
          destinationLocation: this.route.snapshot.queryParams['destinationLocation'],
          leaveDate: this.datePipe.transform(
            this.route.snapshot.queryParams['leaveDate'],
            'yyyy-MM-ddTHH:mm:ss'
          ),
          returnDate: this.route.snapshot.queryParams['returnDate'] != 'null'
            ? this.datePipe.transform(this.route.snapshot.queryParams['returnDate'], 'yyyy-MM-ddTHH:mm:ss')
            : null,
          isDirectFlightOnly: this.route.snapshot.queryParams['isDirectFlightOnly'],
          travelClass: this.route.snapshot.queryParams['travelClass'],
          child: parseInt(this.route.snapshot.queryParams['child']),
          infant: parseInt(this.route.snapshot.queryParams['infant']),
          adult: parseInt(this.route.snapshot.queryParams['adult']),
          multiCities: JSON.stringify(multiCityData),
        };
        filters.leaveDate = this.datePipe.transform(
          this.route.snapshot.queryParams['leaveDate'],
          'yyyy-MM-ddTHH:mm:ss'
        );
        filters.returnDate = this.route.snapshot.queryParams['returnDate'] != 'null'
          ? this.datePipe.transform(this.route.snapshot.queryParams['returnDate'], 'yyyy-MM-ddTHH:mm:ss')
          : null;
        this.searchfilters = JSON.stringify(filters);
        this.loadFilters();
      }
      else {
        const filter = JSON.stringify(localStorage.getItem('filters'));
        const model = <FlightFiltersModel>JSON.parse(JSON.parse(filter));
        this.destinationLocation = model?.destinationLocation;
        this.originLocation = model?.originLocation;
        this.isSearchResults = false;
        //this.searchResults();
      }
    }
    else {
      this.loadFilters();
    }


    $(document).ready(() => {
      $('[data-toggle="popover"]').popover({ html: true });
      $('.book-details1').click(function () {
        $('.selectbox1').addClass('select1');
        $('.selectbox2').removeClass('select2');
      });
    });
    

    $(document).ready(function () {
      $('.book-details2').click(function () {
        $('.selectbox1').removeClass('select1');
        $('.selectbox2').addClass('select2');
      });
    });
  }

  departureClick() {
    if(this.isdisplayed == true)
    {     
      document.getElementById('selectCity1').classList.add('select1');
    }
    if (
      this.tripType === TripType.MultiCity &&
      this.sharedMulticityData.multicityData !== undefined
    ) {
      this.sharedMulticityData.multicityData.forEach((mData: any, index) => {
        this.sharedMulticityData.hideFromAirportResults(index);
      });
    }

    $('#txtFrom').focus();
  }

  arrivalClick() {
    if(this.isdisplayed == true)
    {   
      document.getElementById('selectCity').classList.add('select2')  
    }
    if (
      this.tripType === TripType.MultiCity &&
      this.sharedMulticityData.multicityData !== undefined
    ) {
      this.sharedMulticityData.multicityData.forEach((mData: any, index) => {
        this.sharedMulticityData.hideFromToAirports(index);
      });
    }

    $('#txtTo').focus();
  }
  multiSearchClick() {
    this.dropDownMultiSearch = this.dropDownMultiSearch === true ? false : true;
  }
  searchDeparturePopup() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.searchDeparture();
    }, this.doneTypingInterval);
  }

  searchArrivalPopup() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.searchArrival();
    }, this.doneTypingInterval);
  }

  getAirports() {
    this.airports = new Array<AirportEntity>();
    this.homeService.getPopularAirports().subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.airports = response.data;
            this.popularCities = response.data;
          }
        } else {
          if (response.message) {
            // alert(response.message);
            this.toasterService.showError(response.message, 'Error');
          } else {
            // alert("Something went wrong! Please try again.");
            this.toasterService.showError(
              'Airports are not loaded! Please try again.',
              'Error'
            );
          }
        }
      } else {
        // alert("Something went wrong! Please try again.");
        this.toasterService.showError(
          'Airports are not loaded! Please try again.',
          'Error'
        );
      }
    });
  }

  loadFilters() {
    this.loadDates();
    const filters = this.searchfilters; // localStorage.getItem('search-filters');

    if (filters) {
      const model = JSON.parse(filters) as FlightFiltersModel;
      this.setDepartureData(model);
      this.setArrivalData(model);
      this.originLocation = model.originLocation;
      this.destinationLocation = model.destinationLocation;
      this.multiCities = model.multiCities;
      this.showDefaultSearchRow = true;
      this.leaveDate = model.leaveDate;
      if (model.returnDate) {
        this.returnDate = model.returnDate;
      }
      if (model.returnDate) {
        this.tripType = TripType.RoundTrip;
        //this.rangeDatePicker(true);
      } else {
        this.tripType = TripType.OneWay;
        //this.singleDatePicker(true);
      }
      if (JSON.parse(model?.multiCities).length > 0) {
        this.showDefaultSearchRow = false;
        this.multiCitiesValues = JSON.parse(model.multiCities);
        this.tripType = TripType.MultiCity;
        this.updateFromMultiCity();
      }
      this.adult = model.adult;
      if (model.child) {
        this.child = model.child;
      } else {
        this.child = 0;
      }
      if (model.infant) {
        this.infant = model.infant;
      } else {
        this.infant = 0;
      }

      this.travelClass = model.travelClass;
      this.travelClassName = Common.getTravelClassName(this.travelClass);
    } else {
      this.isLoaded = false;
    }

    this.searchResults();
  }

  updateFromMultiCity() {
    const mList = [];
    for (let i = 1; i < this.multiCitiesValues.length; i++) {
      mList.push(this.multiCitiesValues[i].departureCity + ',');
    }
    const list = mList.length === 0 ? '' : ' Via ' + mList.join(' ');
    this.multiCityFromName =
      this.multiCitiesValues[0].departureCity +
      ' To ' +
      this.multiCitiesValues[this.multiCitiesValues.length - 1].arrivalCity +
      list;
  }

  setDepartureData(model: any) {
    this.homeService
      .getAirportByCode(model.originLocation)
      .subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            if (response.data) {
              this.selectedOrigin(response.data);
            }
          } else {
            if (response.message) {
              this.toasterService.showError(response.message, 'Error');
            }
          }
        }
      });
  }

  setArrivalData(model: any) {
    this.homeService
      .getAirportByCode(model.destinationLocation)
      .subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            if (response.data) {
              this.selectedDestination(response.data);
            }
          } else {
            if (response.message) {
              this.toasterService.showError(response.message, 'Error');
            }
          }
        }
      });
  }

  loadDates() {
    const filters = this.searchfilters; // localStorage.getItem('search-filters');
    if (filters) {
      const model = JSON.parse(filters) as FlightFiltersModel;
      if (model.returnDate) {
        this.selectedLeaveDate = new Date(model.leaveDate);
        this.selectedReturnDate = new Date(model.returnDate);
        this.getDates(this.selectedLeaveDate, this.selectedReturnDate, 4);
        const date = `${this.selectedLeaveDate.getDate()} ${this.monthNames[this.selectedLeaveDate.getMonth()]
          } - ${this.selectedReturnDate.getDate()} ${this.monthNames[this.selectedReturnDate.getMonth()]
          }`;
        this.list.push({
          label: date,
          leaveDateOrignal: this.selectedLeaveDate,
          returnDateOrignal: this.selectedReturnDate,
          leaveDate: this.datePipe.transform(
            this.selectedLeaveDate,
            'yyyyMMdd'
          ),
          returnDate: this.datePipe.transform(
            this.selectedReturnDate,
            'yyyyMMdd'
          ),
        });
        this.getDates(this.selectedLeaveDate, this.selectedReturnDate, -4);
      } else {
        this.selectedLeaveDate = new Date(model.leaveDate);
        this.getOneWayDates(this.selectedLeaveDate, 4);
        const date = `${this.selectedLeaveDate.getDate()} ${this.monthNames[this.selectedLeaveDate.getMonth()]
          }`;
        this.list.push({
          label: date,
          leaveDateOrignal: this.selectedLeaveDate,
          returnDateOrignal: this.selectedReturnDate,
          leaveDate: this.datePipe.transform(
            this.selectedLeaveDate,
            'yyyyMMdd'
          ),
        });
        this.getOneWayDates(this.selectedLeaveDate, -4);
      }
    }
  }

  getDates(leaveDate: Date, returnDate: Date, days: number) {
    const fulureDates = [];
    const pastDates = [];
    for (let I = 0; I < Math.abs(days); I++) {
      pastDates.push(
        new Date(
          leaveDate.getTime() -
          (days >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000
        )
      );
    }
    for (let I = 0; I < Math.abs(days); I++) {
      fulureDates.push(
        new Date(
          returnDate.getTime() -
          (days >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000
        )
      );
    }
    if (days == 4) {
      this.list = [];
      for (let index = 1; index < 4; index++) {
        const pastDate = pastDates[4 - index];
        const futureDate = fulureDates[4 - index];
        const date = `${pastDate.getDate()} ${this.monthNames[pastDate.getMonth()]
          } - ${futureDate.getDate()} ${this.monthNames[futureDate.getMonth()]}`;

        this.list.push({
          label: date,
          leaveDateOrignal: pastDate,
          returnDateOrignal: futureDate,
          leaveDate: this.datePipe.transform(pastDate, 'yyyyMMdd'),
          returnDate: this.datePipe.transform(futureDate, 'yyyyMMdd'),
        });
      }
    } else {
      for (let index = 1; index < 4; index++) {
        const pastDate = pastDates[index];
        const futureDate = fulureDates[index];
        const date = `${pastDate.getDate()} ${this.monthNames[pastDate.getMonth()]
          } - ${futureDate.getDate()} ${this.monthNames[futureDate.getMonth()]}`;
        this.list.push({
          label: date,
          leaveDateOrignal: pastDate,
          returnDateOrignal: futureDate,
          leaveDate: this.datePipe.transform(pastDate, 'yyyyMMdd'),
          returnDate: this.datePipe.transform(futureDate, 'yyyyMMdd'),
        });
      }
    }
    return this.list;
  }

  getOneWayDates(leaveDate: Date, days: number) {
    const dates = [];
    for (let I = 0; I < Math.abs(days); I++) {
      dates.push(
        new Date(
          leaveDate.getTime() -
          (days >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000
        )
      );
    }
    if (days == 4) {
      this.list = [];
      for (let index = 1; index < 4; index++) {
        const pastDate = dates[4 - index];
        const date = `${pastDate.getDate()} ${this.monthNames[pastDate.getMonth()]
          }`;
        this.list.push({
          label: date,
          leaveDateOrignal: pastDate,
          leaveDate: this.datePipe.transform(pastDate, 'yyyyMMdd'),
        });
      }
    } else {
      for (let index = 1; index < 4; index++) {
        const pastDate = dates[index];
        const date = `${pastDate.getDate()} ${this.monthNames[pastDate.getMonth()]
          }`;
        this.list.push({
          label: date,
          leaveDateOrignal: pastDate,
          leaveDate: this.datePipe.transform(pastDate, 'yyyyMMdd'),
        });
      }
    }

    return this.list;
  }

  searchDeparture() {
    const value = $('#txtFrom').val();
    if (value) {
      this.isSuggest = false;

      this.homeService.getAirportsSearch(value).subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            if (response.data) {
              this.departureAirportResults = response.data;
            }
          } else {
            if (response.message) {
              this.toasterService.showError(response.message, 'Error');
            }
          }
        }
      });
    } else {
      this.isSuggest = true;

      this.departureAirportResults = new Array<AirportEntity>();
    }
  }

  selectedOrigin(airport: AirportEntity) {
    this.originLocation = airport.code;
    this.departureCity = airport.city;
    this.departureTitle =
      airport.code + ', ' + airport.name + ' ' + airport.country;
    if (this.departureTitle.length > 18) {
      this.departureAirportName = this.departureTitle.substr(0, 18) + '...';
    } else {
      this.departureAirportName = this.departureTitle;
    }
    this.departureAirportResults = new Array<AirportEntity>();
    $('#txtFrom').val('');
    this.validateOriginLocation();
    this.validateFromAndToAirports();
  }

  searchArrival() {
    const value = $('#txtTo').val();
    if (value) {
      this.isSuggest = false;
      this.homeService.getAirportsSearch(value).subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            if (response.data) {
              this.arrivalAirportResults = response.data;
            }
          } else {
            if (response.message) {
              this.toasterService.showError(response.message, 'Error');
            }
          }
        }
      });
    } else {
      this.arrivalAirportResults = new Array<AirportEntity>();
      this.isSuggest = true;
    }
  }

  selectedDestination(airport: AirportEntity) {
    this.destinationLocation = airport.code;
    this.arrivalCity = airport.city;
    this.arrivalTitle =
      airport.code + ', ' + airport.name + ' ' + airport.country;
    if (this.arrivalTitle.length > 18) {
      this.arrivalAirportName = this.arrivalTitle.substr(0, 18) + '...';
    } else {
      this.arrivalAirportName = this.arrivalTitle;
    }
    this.arrivalAirportResults = new Array<AirportEntity>();
    $('#txtTo').val('');
    this.validateFromAndToAirports();
  }

  swapLocations() {
    const destinationLocation = this.destinationLocation;
    const arrivalCity = this.arrivalCity;
    const arrivalTitle = this.arrivalTitle;
    const arrivalAirportName = this.arrivalAirportName;

    this.destinationLocation = this.originLocation;
    this.arrivalCity = this.departureCity;
    this.arrivalTitle = this.departureTitle;
    this.arrivalAirportName = this.departureAirportName;

    this.originLocation = destinationLocation;
    this.departureCity = arrivalCity;
    this.departureTitle = arrivalTitle;
    this.departureAirportName = arrivalAirportName;
  }

  getTravelClass() {
    setTimeout(() => {
      this.travelClassName = Common.getTravelClassName(this.travelClass);
      // this.travelClassName = this.commonService.getTravelClassName(this.travelClass);
      $(document).ready(function () {
        $('.book-peron2').removeClass('economy');
      });
    });
  }
  singleDatePicker(isInitial: boolean = false) {
    if (this.rangePicker) {
      this.rangePicker.destroy();
    } // destroy old picker object

    if (this.singlePicker) {
      this.singlePicker.destroy();
    } // destroy old picker object

    if (this.returnDate) {
      this.returnDate = null;
    }

  this.singlePicker = new Lightpick({
    field: this.isdisplayed ==true? document.getElementById('dpLeaveDate1'):document.getElementById('dpLeaveDate'),
    numberOfMonths: 2,
    startDate: new Date(this.leaveDate),
    minDate: moment().toDate(),
    onSelect: (date) => {
      this.leaveDate = date;
      this.returnDate =
        this.tripType === TripType.RoundTrip
          ? moment(this.leaveDate).add(1, 'days').toDate()
          : null;
    },
  });

    if (!isInitial) {
      this.singlePicker.show();
    }

    // if (this.tripType === TripType.RoundTrip) {
    //   this.returnDate = moment(this.leaveDate).add(1, 'days').toDate();
    //   this.rangePicker.setDateRange(this.leaveDate, this.returnDate);
    //    this.rangePicker.show();
    // }else{
    //   if (!isInitial) {
    //     this.singlePicker.show();
    //   }
    // }
  }

  rangeDatePicker(isInitial: boolean = false, returnDate: Date = null) {
    if (this.singlePicker) {
      this.singlePicker.destroy();
    } // destroy old picker object
    if (this.rangePicker) {
      this.rangePicker.destroy();
    } // destroy old picker object
    if (!this.returnDate) {
      this.returnDate = moment(this.leaveDate).add(1, 'days').toDate();
    }
  
    this.rangePicker = new Lightpick({
      field: this.isdisplayed== true? document.getElementById('dpLeaveDate1'): document.getElementById('dpLeaveDate'),
      secondField:this.isdisplayed== true? document.getElementById('dpReturnDate1'):document.getElementById('dpReturnDate'),
      // singleDate: true,
      repick: true,
      singleDate: true,

      numberOfMonths: 2,
      startDate: this.leaveDate,
      endDate: returnDate
        ? returnDate
        : moment(this.leaveDate).add(1, 'days').toDate(),
      minDate: this.leaveDate ? this.leaveDate : moment().toDate(),
      onSelect: (start, end) => {
        // this.leaveDate = start;
        this.returnDate = end;
        // this.rangePicker.hide();
      },
    });
    this.rangePicker.setDateRange(this.leaveDate, this.returnDate);
    if (!isInitial) {
      // this.rangePicker.setDateRange(this.leaveDate, this.returnDate);
      this.rangePicker.show();
    } else {
      // this.rangePicker.setDateRange(this.leaveDate, moment(this.leaveDate).add(1, 'days').toDate());
    }
    this.tripType = TripType.RoundTrip;
  }

  onTripTypeChanged(tripType: TripType) {
    this.tripType = tripType;
    this.dropDownMultiSearch = false;
    if (this.tripType === TripType.OneWay) {
      this.singleDatePicker(true);
    } else if (this.tripType === TripType.RoundTrip) {
      this.rangeDatePicker(true);
    } else if (this.tripType === this.tripTypeEnum.MultiCity) {
      this.dropDownMultiSearch = true;
      if (this.returnDate) {
        this.returnDate = null;
      }
    }

    this.loadDates();
  }

  GetTripName(tripType: TripType): string {
    if (this.tripType === TripType.OneWay) {
      return "one_way"
    } else if (this.tripType === TripType.RoundTrip) {
      return "round_trip"
    }
  }

  validateOriginLocation() {
    if (!this.originLocation) {
      $('#liDeparture').popover('show');
    } else {
      $('#liDeparture').popover('hide');
    }
  }

  validateFromAndToAirports() {
    if (this.originLocation && this.destinationLocation) {
      if (_.isEqual(this.originLocation, this.destinationLocation)) {
        this.toasterService.showError(
          "<span><i class='fa fa-exclamation-triangle'></i> From & To airports cannot be the same</span>",
          'Error'
        );
      } else {
        $('#liArrival').popover('hide');
      }
    }
  }

  validateTravellers() {
    if (this.Travellers > 9) {
      $('#liTravellers').popover('show');
    } else {
      // $('#liTravellers').popover('hide');
    }
  }

  applyTravellers() {
    if (this.Travellers > 9) {
      $('#liTravellers').popover('show');
    } else {
      $('#liTravellers').popover('hide');
      $('.book-peron1').removeClass('bookon');
    }
  }

  getPrice(date: any) {
    let price = 0;
    if (this.searchResult.altDaysFlights !== undefined) {
      for (const element of this.searchResult?.altDaysFlights.sort((a, b) => a.totalFare - b.totalFare)) {
        if (date.returnDate) {
          if (
            this.datePipe.transform(
              element?.flightMini?.departure?.departureDateTime,
              'yyyyMMdd'
            ) === date.leaveDate &&
            this.datePipe.transform(
              element?.flightMini?.return?.departureDateTime,
              'yyyyMMdd'
            ) === date.returnDate
          ) {
            price = element.flightMini.totalFare;
            break;
          }
        } else {
          if (
            this.datePipe.transform(
              element?.flightMini?.departure?.departureDateTime,
              'yyyyMMdd'
            ) === date.leaveDate
          ) {
            price = element.flightMini.totalFare;
            break;
          }
          if (
            this.datePipe.transform(
              this.searchResult?.cheapestFlight?.flightMini?.departure
                ?.departureDateTime,
              'yyyyMMdd'
            ) === date.leaveDate
          ) {
            price = this.searchResult?.cheapestFlight?.flightMini?.totalFare;
          }
        }
      }
    }

    return price === 0 ? null : formatNumber(price, this.locale, '1.0');
  }
  getSelectedPrice(date: any) {
    let price = 0;
    if (this.searchResult.flights !== undefined) {
      for (const element of this.searchResult?.flights) {
        if (date.returnDate) {
          if (
            this.datePipe.transform(
              element?.flightMini?.departure?.departureDateTime,
              'yyyyMMdd'
            ) === date.leaveDate &&
            this.datePipe.transform(
              element?.flightMini?.return?.departureDateTime,
              'yyyyMMdd'
            ) === date.returnDate
          ) {
            price = element.flightMini.totalFare;
            break;
          }
        } else {
          if (
            this.datePipe.transform(
              element?.flightMini?.departure?.departureDateTime,
              'yyyyMMdd'
            ) === date.leaveDate
          ) {
            price = element.flightMini.totalFare;
            break;
          }
          if (
            this.datePipe.transform(
              this.searchResult?.cheapestFlight?.flightMini?.departure
                ?.departureDateTime,
              'yyyyMMdd'
            ) === date.leaveDate
          ) {
            price = this.searchResult?.cheapestFlight?.flightMini?.totalFare;
          }
        }
      }
    }

    return price === 0 ? null : formatNumber(price, this.locale, '1.0');
  }

  showSearch()
  {
    this.isdisplayed=true;   
  }
  closeSearch()
  {
    this.isdisplayed=false;
  }
  public showDiv:boolean = true
  searchResults(date?: any) {
  
    this.showDiv = false;
    if(this.showDiv == false){
      //document.getElementById('search-div').classList.add('display-n');
      document.getElementById('search-div').setAttribute('style', 'display:none');
    }
    //this.isShowed= false
    this.isdisplayed = false
    this.isLoaded = false;
    this.isSearchResults = true;
    let isValid = true;
    if (this.tripType === this.tripTypeEnum.MultiCity) {
      if (this.multiCitiesValues && this.multiCitiesValues.length > 0) {
        this.originLocation = this.multiCitiesValues[0].departureCode;
        this.destinationLocation = this.multiCitiesValues[0].arrivalCode;
      }
    }
    if (!this.originLocation) {
      $('#liDeparture').popover('show');
      isValid = false;
    } else {
      $('#liDeparture').popover('hide');
    }

    if (!this.destinationLocation) {
      $('#liArrival').popover('show');
      isValid = false;
    } else {
      $('#liArrival').popover('hide');
    }

    if (this.originLocation && this.destinationLocation) {
      if (_.isEqual(this.originLocation, this.destinationLocation)) {
        this.toasterService.showError(
          "<span><i class='fa fa-exclamation-triangle'></i> From & To airports cannot be the same</span>",
          'Error'
        );
        isValid = false;
      } else {
        $('#liArrival').popover('hide');
      }
    }

    if (this.Travellers > 9) {
      $('#liTravellers').popover('show');
      isValid = false;
    } else {
      $('#liTravellers').popover('hide');
    }

    if (!isValid) {
      this.isLoaded = true;
      return;
    }

    if (date) {
      this.leaveDate = date.leaveDateOrignal;
      if (date.returnDateOrignal) {
        this.returnDate = date.returnDateOrignal;
      }
    }
    const multiCityData = [];
    if (this.tripType === TripType.MultiCity) {
      this.showDefaultSearchRow = false;
      for (const item of this.multiCitiesValues) {
        multiCityData.push({
          originLocation: item.departureCode,
          destinationLocation: item.arrivalCode,
          departureDateTime: item.departureDate,
          departureCode: item.departureCode,
          departureCity: item.departureCity,
          departureAirportName: '',
          arrivalCode: item.arrivalCode,
          arrivalCity: item.arrivalCity,
          arrivalAirportName: item.arrivalAirportName,
          departureDate: item.departureDate,
          departureDisplayDate: item.departureDate,
        });
      }
    }
    const filters = {
      trip: this.GetTripName(this.tripType),
      originLocation: this.originLocation,
      destinationLocation: this.destinationLocation,
      leaveDate: new Date(this.leaveDate).toISOString(),
      returnDate: this.returnDate
        ? new Date(this.returnDate).toISOString()
        : null,
      isDirectFlightOnly: true,
      travelClass: this.travelClass,
      child: parseInt(this.child.toString()),
      infant: parseInt(this.infant.toString()),
      adult: parseInt(this.adult.toString()),
      multiCities: JSON.stringify(multiCityData),
      roleName: this.authService.getRole(),
    };
    filters.leaveDate = this.datePipe.transform(
      this.leaveDate,
      'yyyy-MM-ddTHH:mm:ss'
    );
    filters.returnDate = this.returnDate
      ? this.datePipe.transform(this.returnDate, 'yyyy-MM-ddTHH:mm:ss')
      : null;
    // localStorage.setItem('search-filters', JSON.stringify(filters));    
    this.searchfilters = JSON.stringify(filters);
    this.searchResult = new SearchResultModel();
    this.searchResult.flights = new Array<FlightModel>();
    this.searchResult.airlineFliters = new Array<AirlineFliterModel>();
    this.searchResult.stopFilters = new Array<StopFilterModel>();
    this.clear();
    sessionStorage.removeItem('flights');
    this.homeService.searchFlights(filters).subscribe((response) => {
      this.isLoaded = true;
      if (response) {
        if (response.status === 'success') {
          this.showDiv = true;
          this.isShow=true;
          document.getElementById('search-div').classList.add('d-lg-block')
          //document.getElementById('search-div').setAttribute('style', 'display:none');
          if (response.data) {
            //localStorage.setItem('flightResult', response.data);
            this.locationResult = response.data.bestFlight;
            this.searchResultEvent.emit(response.data);
            this.searchResult = JSON.parse(JSON.stringify(response.data));
            this.flightResult = JSON.parse(JSON.stringify(response.data));
            this.flights = [];
            this.altDaysFlights = JSON.parse(
              JSON.stringify(response.data.altDaysFlights)
            );
            const flightsArray = [];
            this.searchResult.flights.sort((a, b) => a.totalFare - b.totalFare).forEach((o) => {
              // flightsArray.push(o);
              const list = this.searchResult.flights.filter(
                (i) =>
                  i.originLocation === o.originLocation &&
                  i.destinationLocation === o.destinationLocation &&
                  i.totalFare === o.totalFare
              );
              const finalResult = list.sort((a, b) => a.totalFare - b.totalFare).filter((x) => x.flightId != o.flightId);
              flightsArray.push(...finalResult);
              const isExist = flightsArray.find(
                (x) => x.flightId == o.flightId
              );
              if (!isExist) {
                this.flights.push({
                  ...o,
                  childs: finalResult,
                });
              }
            });
            this.searchResult.flights = JSON.parse(
              JSON.stringify(this.flights.sort((a, b) => a.totalFare - b.totalFare))
            );
            const allAirline = new AirlineFliterModel();
            allAirline.code = 'ALL';
            allAirline.name = 'All';
            this.searchResult.airlineFliters.unshift(allAirline);
            const allStop = new StopFilterModel();
            allStop.value = 'ALL';
            allStop.text = 'All';
            this.searchResult.stopFilters.unshift(allStop);
            this.bestFlight = this.searchResult.bestFlight;
            this.cheapestFlight = this.searchResult.cheapestFlight;
            this.fastestFlight = this.searchResult.fastestFlight;
            sessionStorage.setItem(
              'flights',
              JSON.stringify(this.searchResult.flights)
            );
            this.loadDates();
          }
        } else {
          this.searchResult.flights = new Array<FlightModel>();
          if (response.message) {
            this.searchResultsErrMsg = response.message;
          } else {
            this.isLoaded = false;
            // this.searchResultsErrMsg ='Something went wrong! Please try again.';
            this.toasterService.showError(
              'Search Result Err 1: Unknown; Try Again',
              'Error'
            );
          }
          // this.isSearchResultsError = true;
        }
      } else {
        // this.isSearchResultsError = true;
        // this.searchResultsErrMsg = 'Something went wrong! Please try again.';
        this.searchResult.flights = new Array<FlightModel>();
        this.isLoaded = false;
        this.toasterService.showError(
          'Search Result Err 2: Unknown; Try Again',
          'Error'
        );
      }
    });
  }

  loadResults() {
    this.isLoaded = false;
    this.searchResult = new SearchResultModel();
    this.searchResult.flights = new Array<FlightModel>();
    this.searchResult.airlineFliters = new Array<AirlineFliterModel>();
    this.searchResult.stopFilters = new Array<StopFilterModel>();
    //const flightResult = JSON.parse(localStorage.getItem('flightResult'));

    this.searchResult = JSON.parse(JSON.stringify(this.flightResult));
    this.flights = [];
    this.altDaysFlights = this.searchResult.altDaysFlights;
    const flightsArray = [];
    this.searchResult.flights.forEach((o) => {
      const list = this.searchResult.flights.filter(
        (i) =>
          i.originLocation === o.originLocation &&
          i.destinationLocation === o.destinationLocation &&
          i.totalFare === o.totalFare
      );
      const finalResult = list.filter((x) => x.flightId != o.flightId);
      flightsArray.push(...finalResult);
      const isExist = flightsArray.find((x) => x.flightId == o.flightId);
      if (!isExist) {
        this.flights.push({
          ...o,
          childs: finalResult,
        });
      }
    });
  }

  applyFilter() {
    // Stop Filter
    const flights = JSON.parse(sessionStorage.getItem('flights'));
    if (this.stopFilter === 'ALL') {
      this.searchResult.flights = flights;
    } else if (this.stopFilter === '0') {
      if (this.tripType === TripType.RoundTrip) {
        this.searchResult.flights = flights.filter(
          (x) => !x.flightMini.departure.stops && !x.flightMini.return.stops
        );
      } else {
        this.searchResult.flights = flights.filter(
          (x) => !x.flightMini.departure.stops
        );
      }
    } else if (this.stopFilter === '1') {
      if (this.tripType === TripType.RoundTrip) {
        this.searchResult.flights = flights.filter(
          (x) =>
            x.flightMini.departure.stops &&
            x.flightMini.departure.stops === 1 &&
            x.flightMini.return.stops &&
            x.flightMini.return.stops === 1
        );
      } else {
        this.searchResult.flights = flights.filter(
          (x) =>
            x.flightMini.departure.stops && x.flightMini.departure.stops === 1
        );
      }
    } else if (this.stopFilter === '1+') {
      if (this.tripType === TripType.RoundTrip) {
        this.searchResult.flights = flights.filter(
          (x) =>
            x.flightMini.departure.stops &&
            x.flightMini.departure.stops > 1 &&
            x.flightMini.return.stops &&
            x.flightMini.return.stops > 1
        );
      } else {
        this.searchResult.flights = flights.filter(
          (x) =>
            x.flightMini.departure.stops && x.flightMini.departure.stops > 1
        );
      }
    }

    // Airline Filter
    if (this.airlineFilter === 'ALL') {
      this.searchResult.flights = this.searchResult.flights;
    } else {
      const result = this.searchResult.flights.filter(
        (x) => x.airlineCode === this.airlineFilter
      );
      this.searchResult.flights = result;
    }

    // Arrange By Filter
    if (this.arrangeFilter === 'lowest_fare') {
      const result = this.searchResult.flights.sort((a, b) => {
        return 0 - (a.totalFare > b.totalFare ? -1 : 1);
      });
      this.searchResult.flights = result;
    } else if (this.arrangeFilter === 'shortest_travel_time') {
      const result = this.searchResult.flights.sort((a, b) => {
        return (
          0 -
          (a.flightMini.totalElapsedTime > b.flightMini.totalElapsedTime
            ? -1
            : 1)
        );
      });
      this.searchResult.flights = result;
    }
  }

  reviewBooking(flight: any, fareIndex: any) {
    if (fareIndex >= 0) {
      flight.fareDetails.farePrices = Object.assign({}, flight.farePrices[fareIndex])
      if (flight.airlineType == 'LCC' && flight.flightSegments) {
        flight.flightSegments[0].baggage.familyDescription = flight.fareDetails.farePrices.familyDescription;
        flight.flightSegments[0].baggage.familyName = flight.fareDetails.farePrices.familyName;
        flight.flightSegments[0].baggage.cabinName = flight.fareDetails.farePrices.cabinName;
      }
    }
    sessionStorage.setItem('selectedFlight', JSON.stringify(flight));
    if (flight) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/review-booking/' + flight.flightId])
      );
      window.open(url, '_blank');
    }
  }

  clear() {
    this.isSearchResultsError = false;
    this.searchResultsErrMsg = '';
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    // add class and remove class
    setTimeout(() => {
      Home_init();
    }, 100);

    /*-------------------------------------------
    add class active
    --------------------------------------------*/
    $('.book-peron .buisness li a').click(function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $('.book-peron .buisness li a.active').removeClass('active');
        $(this).addClass('active');
      }
    });
  }

  hideDepartureAirportResults() {
    $('.selectbox1').removeClass('select1');
  }

  hideArrivalAirportResults() {
    $('.selectbox2').removeClass('select2');
  }

  getSelected(date) {
    if (
      date.leaveDate ===
      this.datePipe.transform(this.selectedLeaveDate, 'yyyyMMdd')
    ) {
      return true;
    }
    return false;
  }

  selectDate(date) {
    this.selectedLeaveDate = date.leaveDateOrignal;
    this.selectedReturnDate = date.returnDateOrignal
      ? date.returnDateOrignal
      : null;
    this.searchResults(date);
    this.loadDates();
  }

  public getImageWeight(value) {
    if (value == 'Direct') {
      return 'assets/images/search/arrow-right.png';
    } else {
      return 'assets/images/search/arrow-first.png';
    }
  }

  ngOnDestroy() {
    //this.searchfilters = '';
  }
}

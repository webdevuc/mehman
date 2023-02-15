import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { TripType } from 'src/app/models/enums.model';
import { ToasterService } from 'src/app/services/toastr-service';
import { SharedMulticityComponent } from 'src/app/shared/shared-multicity/shared-multicity.component';
import Lightpick from 'src/assets/js/lightpick.min.js';
import { AirportEntity } from '../../entities/airport-entity.model';
import { HomeService } from '../../shared/home.service';


import * as _ from 'lodash';
import { Common } from 'src/app/models/common';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-flights-tab',
  templateUrl: './flights-tab.component.html',
  styleUrls: ['./flights-tab.component.scss']
})
export class FlightsTabComponent implements OnInit, AfterViewInit {
  @ViewChild(SharedMulticityComponent)
  sharedMulticityData: SharedMulticityComponent;
  tripType: TripType;
  travelClass: string;
  originLocation = 'LHE';
  destinationLocation = 'DXB';
  tripTypeEnum = TripType;
  returnDate?: Date;
  singlePicker: any;
  rangePicker: any;
  leaveDate: Date;
  departureTitle: string;
  arrivalCity: string;
  departureCity: string;
  arrivalAirportName: string;
  departureAirportName: string;
  arrivalTitle: string;
  departureAirportResults: Array<AirportEntity>;
  liArrivalErrMsg: string;
  typingTimer: any; // timer identifier
  isSuggest = true;
  popularCities = [];
  travelClassName: string;
  arrivalAirportResults: Array<AirportEntity>;
  airports: Array<AirportEntity>;
  recentSearches: any[] = [];

  // setup before functions
  doneTypingInterval = 1000; // time in ms (1 second)
  adult: number;
  child: number;
  infant: number;

  constructor(private homeService: HomeService,
    private toasterService: ToasterService,
    private router: Router,) { }
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.hideDepartureAirportResults();
      this.hideArrivalAirportResults();
    }
  }
  ngOnInit(): void {
    this.arrivalAirportResults = new Array<AirportEntity>();
    this.departureAirportResults = new Array<AirportEntity>();
    this.departureCity = 'Lahore';
    this.arrivalCity = 'Dubai';
    this.departureTitle = 'LHE, Alama Iqbal International Airport Pakistan';
    this.departureAirportName = 'LHE, Alama Iqbal International...';
    this.arrivalAirportName = 'DXB, Dubai International Airpo...';
    this.arrivalTitle = 'DXB, Dubai International Airport United Arab Emirates';
    this.adult = 1;
    this.child = 0;
    this.infant = 0;
    this.leaveDate = moment().add(1, 'days').toDate();
    this.rangeDatePicker(true);
    this.getAirports();
    this.travelClass = 'Y'; // Economy
    this.travelClassName = Common.getTravelClassName(this.travelClass);
  }

  onTripTypeChanged() {
    if (
      this.tripType === TripType.OneWay ||
      this.tripType === this.tripTypeEnum.MultiCity
    ) {
      this.singleDatePicker(true);
    } else if (this.tripType === TripType.RoundTrip) {
      this.rangeDatePicker(true);
    }
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
      field: document.getElementById('dpLeaveDate'),
      secondField: document.getElementById('dpReturnDate'),
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
      field: document.getElementById('dpLeaveDate'),
      numberOfMonths: 2,
      startDate: this.leaveDate,
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
  }

  departureClick() {
    this.sharedMulticityData.multicityData.forEach((mData: any, index) => {
      this.sharedMulticityData.hideFromAirportResults(index);
    });
    $('#txtFrom').focus();
  }

  arrivalClick() {
    this.sharedMulticityData.multicityData.forEach((mData: any, index) => {
      this.sharedMulticityData.hideFromToAirports(index);
    });
    $('#txtTo').focus();
  }

  selectedOrigin(airport: AirportEntity) {
    this.originLocation = airport.code;
    this.departureCity = airport.city;
    this.departureTitle =
      airport.code + ', ' + airport.name + ' ' + airport.country;
    if (this.departureTitle.length > 30) {
      this.departureAirportName = this.departureTitle.substr(0, 30) + '...';
    } else {
      this.departureAirportName = this.departureTitle;
    }
    this.departureAirportResults = new Array<AirportEntity>();
    $('#txtFrom').val('');
    this.validateOriginLocation();
    this.validateFromAndToAirports();
  }

  selectedDestination(airport: AirportEntity) {
    this.destinationLocation = airport.code;
    this.arrivalCity = airport.city;
    this.arrivalTitle =
      airport.code + ', ' + airport.name + ' ' + airport.country;
    if (this.arrivalTitle.length > 30) {
      this.arrivalAirportName = this.arrivalTitle.substr(0, 30) + '...';
    } else {
      this.arrivalAirportName = this.arrivalTitle;
    }
    this.arrivalAirportResults = new Array<AirportEntity>();
    $('#txtTo').val('');
    this.validateDestinationLocation();
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
        this.liArrivalErrMsg =
          "<span><i class='fa fa-exclamation-triangle'></i> From & To airports cannot be the same</span>";
        setTimeout(() => {
          $('#liArrival').popover('show');
        });
      } else {
        $('#liArrival').popover('hide');
        this.liArrivalErrMsg = '';
      }
    }
  }

  validateDestinationLocation() {
    if (!this.destinationLocation) {
      this.liArrivalErrMsg =
        "<span><i class='fa fa-exclamation-triangle'></i> Enter valid To airport</span>";
      setTimeout(() => {
        $('#liArrival').popover('show');
      });
    } else {
      $('#liArrival').popover('hide');
      this.liArrivalErrMsg = '';
    }
  }

  searchArrivalPopup() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.searchArrival();
    }, this.doneTypingInterval);
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

  searchDeparturePopup() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.searchDeparture();
    }, this.doneTypingInterval);
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
      this.departureAirportResults = new Array<AirportEntity>();
      this.isSuggest = true;
    }
  }

  getAirports() {
    this.airports = new Array<AirportEntity>();
    this.homeService.getPopularAirports().subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.airports = response.data;
            this.popularCities = response.data;
            // this.loadFilters();
          }
        } else {
          if (response.message) {
            // alert(response.message);
            this.toasterService.showError(
              'Airports are not loaded! Please try again.',
              'Error'
            );
          } else {
            this.toasterService.showError(
              'Airports are not loaded! Please try again.',
              'Error'
            );
          }
        }
      } else {
        // alert("Airports are not loaded! Please try again.");
        this.toasterService.showError(
          'Airports are not loaded! Please try again.',
          'Error'
        );
      }
    });
  }

  hideDepartureAirportResults() {
    $('.selectbox1').removeClass('select1');
  }

  hideArrivalAirportResults() {
    // tslint:disable-next-line: quotemark
    $('.selectbox2').removeClass('select2');
  }

  get Travellers(): number {
    return (
      parseInt(this.adult.toString()) +
      parseInt(this.child.toString()) +
      parseInt(this.infant.toString())
    );
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

  getTravelClass() {
    setTimeout(() => {
      this.travelClassName = Common.getTravelClassName(this.travelClass);
      // this.travelClassName = this.commonService.getTravelClassName(this.travelClass);
    });

    $(document).ready(function () {
      $('.book-peron2').removeClass('economy');
    });
  }

  searchResults() {
    let isValid = true;
    if (!this.originLocation) {
      $('#liDeparture').popover('show');
      isValid = false;
    } else {
      $('#liDeparture').popover('hide');
    }

    if (!this.destinationLocation) {
      this.liArrivalErrMsg =
        "<span><i class='fa fa-exclamation-triangle'></i> Enter valid To airport</span>";
      setTimeout(() => {
        $('#liArrival').popover('show');
      });
      isValid = false;
    } else {
      $('#liArrival').popover('hide');
      this.liArrivalErrMsg = '';
    }

    if (this.originLocation && this.destinationLocation) {
      if (_.isEqual(this.originLocation, this.destinationLocation)) {
        this.liArrivalErrMsg =
          "<span><i class='fa fa-exclamation-triangle'></i> From & To airports cannot be the same</span>";
        setTimeout(() => {
          $('#liArrival').popover('show');
        });
        isValid = false;
      } else {
        $('#liArrival').popover('hide');
        this.liArrivalErrMsg = '';
      }
    }

    if (this.Travellers > 9) {
      // $('#liTravellers').popover('show');
      isValid = false;
    } else {
      // $('#liTravellers').popover('hide');
    }

    if (!isValid) {
      return;
    }
    const multiCityData = [];
    if (this.tripType === TripType.MultiCity) {
      multiCityData.push({
        departureCode: this.originLocation,
        departureCity: this.departureCity,
        departureTitle: this.departureTitle,
        departureAirportName: this.departureAirportName,
        arrivalCode: this.destinationLocation,
        arrivalCity: this.arrivalCity,
        arrivalTitle: this.arrivalTitle,
        arrivalAirportName: this.arrivalAirportName,
        departureDate: moment(this.leaveDate).add(0, 'days').toDate(),
        departureDisplayDate: moment(this.leaveDate).add(0, 'days').toDate(),
      });
      this.sharedMulticityData.multicityData.forEach((mData: any) => {
        multiCityData.push(mData);
      });
      console.log(multiCityData);
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
      child: parseInt(this.child.toString(), 0),
      infant: parseInt(this.infant.toString(), 0),
      adult: parseInt(this.adult.toString(), 0),
      multiCities: JSON.stringify(multiCityData),
    };

    const value = JSON.stringify(filters);
    localStorage.setItem('filters', JSON.stringify(filters));

    this.router.navigateByUrl('/search-results?'+ this.objectToQueryString(filters), {
      state: filters,
    });

    // this.router.navigate(['/search-results'], { queryParams: filters});
  }

  private objectToQueryString(obj: any): string {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }

  GetTripName(tripType:TripType):string { 
    if (this.tripType === TripType.OneWay) {
        return "one_way" 
    } else if (this.tripType === TripType.RoundTrip) {
      return "round_trip" 
    }
 } 
 
  setDepartureData(model: any) {
    this.homeService
      .getAirportByCode(model.originLocation)
      .subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            if (response.data) {
              this.selectedOrigin(response.data);
              this.recentSearches.push(response.data);
              localStorage.setItem(
                'recentSearches',
                JSON.stringify(this.recentSearches)
              );
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

  clearFilters() {
    localStorage.removeItem('filters');
    this.tripType = TripType.RoundTrip;
    this.departureCity = 'Lahore';
    this.arrivalCity = 'Dubai';
    this.departureAirportName = 'International Airport';
    this.departureTitle = 'International Airport';
    this.arrivalAirportName = 'International Airport';
    this.arrivalTitle = 'International Airport';
    this.departureAirportResults = new Array<AirportEntity>();
    this.arrivalAirportResults = new Array<AirportEntity>();
    this.travelClass = 'Y'; // Economy
    this.travelClassName = Common.getTravelClassName(this.travelClass);
    // this.travelClassName = this.commonService.getTravelClassName(this.travelClass);
    this.adult = 1;
    this.child = 0;
    this.infant = 0;
    this.leaveDate = moment().add(1, 'days').toDate();
    this.singleDatePicker(true);
    // localStorage.removeItem("airports");
    // this.getAirports();
    const me = this;
    $('#txtFrom').keyup(function () {
      clearTimeout(me.typingTimer);
      this.typingTimer = setTimeout(() => {
        me.searchDeparture();
      }, me.doneTypingInterval);
    });
    $('#txtTo').keyup(function () {
      clearTimeout(me.typingTimer);
      this.typingTimer = setTimeout(() => {
        me.searchArrival();
      }, me.doneTypingInterval);
    });
    $(document).ready(function () {
      $('[data-toggle="popover"]').popover({ html: true });
    });
  }

  ngAfterViewInit(): void {
    // add class and remove class

    $(document).ready(function () {
      $('.book-details1').click(function () {
        $('.selectbox1').addClass('select1');
        // $('.book-peron1').removeClass('bookon');
        $('.book-peron2').removeClass('economy');

        $('.selectbox2').removeClass('select2');
      });

      $('.hrtlCenter').on('click', function (event) {
        $('.selectbox1').removeClass('select1');
      });
    });

    $(document).ready(function () {
      $('.book-details2').click(function () {
        $('.selectbox1').removeClass('select1');
        $('.book-peron1').removeClass('bookon');
        $('.book-peron2').removeClass('economy');

        $('.selectbox2').addClass('select2');
      });

      $('.hrtlCenter').on('click', function (event) {
        $('.selectbox2').removeClass('select2');
      });
    });

    $(document).ready(function () {
      $('body').click(function (e) {
        if ($(e.target).closest('#adult-details').length) {
        } else {
          // $('.book-peron1').removeClass('bookon');
        }

        if ($(e.target).closest('#class-details').length) {
        } else {
          $('.book-peron2').removeClass('economy');
        }
      });
    });

    $(document).ready(function () {
      $('.adult-details').click(function () {
        $('.selectbox1').removeClass('select1');
        $('.selectbox2').removeClass('select2');
        $('.book-peron2').removeClass('economy');
        $('.book-peron1').addClass('bookon');
      });

      $('.adult-btn a').click(function () {
        // $('.book-peron1').removeClass('bookon');
      });
    });

    $(document).ready(function () {
      $('.class-details').click(function () {
        $('.selectbox1').removeClass('select1');
        $('.selectbox2').removeClass('select2');
        $('.book-peron1').removeClass('bookon');
        $('.book-peron2').addClass('economy');
      });

      $('#rbTravelClassEconomy').click(function () {
        $('.book-peron2').removeClass('economy');
      });

      $('.dates').click(() => {
        $('.selectbox1').removeClass('select1');
        $('.selectbox2').removeClass('select2');
        $('.book-peron1').removeClass('bookon');
        $('.book-peron2').removeClass('economy');
      });
    });

    $('.book-peron .buisness li a').click(function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $('.book-peron .buisness li a.active').removeClass('active');
        $(this).addClass('active');
      }
    });
  }
}

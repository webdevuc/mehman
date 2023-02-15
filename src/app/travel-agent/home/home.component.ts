import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import Lightpick from 'src/assets/js/lightpick.min.js';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { AirportEntity } from 'src/app/home/entities/airport-entity.model';
import { FlightFiltersModel } from 'src/app/home/models/flight-filters.model';
import { HomeService } from 'src/app/home/shared/home.service';
import { TripType } from 'src/app/models/enums.model';
import { CommonService } from 'src/app/services/common.service';
import { ToasterService } from 'src/app/services/toastr-service';
import { Common } from 'src/app/models/common';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // Filters
  tripType: TripType;
  originLocation: string;
  destinationLocation: string;
  travelClass: string;
  adult: number;
  child: number;
  infant: number;
  leaveDate: Date;
  returnDate?: Date;

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

  liArrivalErrMsg: string;

  get Travellers(): number {
    return (
      // tslint:disable-next-line: radix
      parseInt(this.adult.toString()) +
      // tslint:disable-next-line: radix
      parseInt(this.child.toString()) +
      // tslint:disable-next-line: radix
      parseInt(this.infant.toString())
    );
  }

  // Private
  private unsubscribeAll: Subject<any>;

  /*
   * Constructor
   *
   */
  constructor(
    private homeService: HomeService,
    private router: Router,
    private toasterService: ToasterService
  ) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /*
   * On init
   */
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.tripType = TripType.OneWay;
    this.departureCity = 'From';
    this.arrivalCity = 'To';
    this.departureAirportName = 'International Airport';
    this.departureTitle = 'International Airport';
    this.arrivalAirportName = 'International Airport';
    this.arrivalTitle = 'International Airport';
    this.departureAirportResults = new Array<AirportEntity>();
    this.arrivalAirportResults = new Array<AirportEntity>();
    this.travelClass = 'Y'; // Economy
    this.travelClassName = Common.getTravelClassName(this.travelClass);
    this.adult = 1;
    this.child = 0;
    this.infant = 0;
    this.leaveDate = moment().add(1, 'days').toDate();

    this.singleDatePicker(true);
    this.getAirports();
    // on keyup, start the countdown
    const me = this;
    // $('#txtFrom').keyup(function () {
    //   clearTimeout(me.typingTimer);
    //   this.typingTimer = setTimeout(() => { me.searchDeparture(); }, me.doneTypingInterval);
    // });
    // $('#txtTo').keyup(function () {
    //   clearTimeout(me.typingTimer);
    //   this.typingTimer = setTimeout(() => { me.searchArrival(); }, me.doneTypingInterval);
    // });
    $(document).ready(function() {
      $('[data-toggle="popover"]').popover({ html: true });
    });
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
    if (localStorage.getItem('airports')) {
      this.airports = JSON.parse(localStorage.getItem('airports'));
      this.loadFilters();
    } else {
      this.homeService.getAllAirports().subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            if (response.data) {
              this.airports = response.data;
              localStorage.setItem('airports', JSON.stringify(response.data));
              this.loadFilters();
            }
          } else {
            if (response.message) {
              // alert(response.message);
              this.toasterService.showError(response.message, 'Error');
            } else {
              this.toasterService.showError(
                'Airports are not loaded! Please try again.',
                'Error'
              );
              // alert('Airports are not loaded! Please try again.');
            }
          }
        } else {
          this.toasterService.showError(
            'Airports are not loaded! Please try again.',
            'Error'
          );
          // alert('Airports are not loaded! Please try again.');
        }
      });
    }
  }

  loadFilters() {
    const filters = localStorage.getItem('filters');
    if (filters) {
      const model = JSON.parse(filters) as FlightFiltersModel;
      const departure = this.airports.filter(
        (x) => x.code == model.originLocation
      )[0];
      this.selectedOrigin(departure);

      const arrival = this.airports.filter(
        (x) => x.code == model.destinationLocation
      )[0];
      this.selectedDestination(arrival);

      this.leaveDate = model.leaveDate;
      if (model.returnDate) {
        this.returnDate = model.returnDate;
      }

      if (model.returnDate) {
        this.tripType = TripType.RoundTrip;
        this.rangeDatePicker(true);
      } else {
        this.tripType = TripType.OneWay;
        this.singleDatePicker(true);
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
    }
  }

  searchDeparture() {
    const value = $('#txtFrom').val();
    if (value) {
      this.departureAirportResults = this.airports.filter(
        (x) =>
          x.name.toLowerCase().search(value.toLowerCase()) !== -1 ||
          x.city.toLowerCase().search(value.toLowerCase()) !== -1 ||
          x.country.toLowerCase().search(value.toLowerCase()) !== -1 ||
          x.code.toLowerCase().search(value.toLowerCase()) !== -1
      );
    } else {
      this.departureAirportResults = new Array<AirportEntity>();
    }
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

  searchArrival() {
    const value = $('#txtTo').val();
    if (value) {
      this.arrivalAirportResults = this.airports.filter(
        (x) =>
          x.name.toLowerCase().search(value.toLowerCase()) !== -1 ||
          x.city.toLowerCase().search(value.toLowerCase()) !== -1 ||
          x.country.toLowerCase().search(value.toLowerCase()) !== -1 ||
          x.code.toLowerCase().search(value.toLowerCase()) !== -1
      );
    } else {
      this.arrivalAirportResults = new Array<AirportEntity>();
    }
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

  getTravelClass() {
    setTimeout(() => {
      this.travelClassName = Common.getTravelClassName(this.travelClass);
    });

    $(document).ready(function() {
      $('.book-peron2').removeClass('economy');
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
      field: document.getElementById('dpLeaveDate'),
      numberOfMonths: 2,
      startDate: this.leaveDate,
      minDate: moment().toDate(),
      onSelect: (date) => {
        this.leaveDate = date;
      },
    });
    if (!isInitial) {
      this.singlePicker.show();
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
      singleDate: false,
      numberOfMonths: 2,
      startDate: this.leaveDate,
      endDate: returnDate
        ? returnDate
        : moment(this.leaveDate).add(1, 'days').toDate(),
      minDate: moment().toDate(),
      onSelect: (start, end) => {
        this.leaveDate = start;
        this.returnDate = end;
      },
    });
    this.rangePicker.setDateRange(this.leaveDate, this.returnDate);
    if (!isInitial) {
      this.rangePicker.show();
    }
    this.tripType = TripType.RoundTrip;
  }

  onTripTypeChanged() {
    if (this.tripType === TripType.OneWay) {
      this.singleDatePicker(true);
    } else if (this.tripType === TripType.RoundTrip) {
      this.rangeDatePicker(true);
    }
  }

  validateOriginLocation() {
    if (!this.originLocation) {
      $('#liDeparture').popover('show');
    } else {
      $('#liDeparture').popover('hide');
    }
  }

  validateDestinationLocation() {
    if (!this.destinationLocation) {
      this.liArrivalErrMsg =
        '<span><i class=\'fa fa-exclamation-triangle\'></i> Enter valid To airport</span>';
      setTimeout(() => {
        $('#liArrival').popover('show');
      });
    } else {
      $('#liArrival').popover('hide');
      this.liArrivalErrMsg = '';
    }
  }

  validateFromAndToAirports() {
    if (this.originLocation && this.destinationLocation) {
      if (_.isEqual(this.originLocation, this.destinationLocation)) {
        this.liArrivalErrMsg =
          '<span><i class=\'fa fa-exclamation-triangle\'></i> From & To airports cannot be the same</span>';
        setTimeout(() => {
          $('#liArrival').popover('show');
        });
      } else {
        $('#liArrival').popover('hide');
        this.liArrivalErrMsg = '';
      }
    }
  }

  validateTravellers() {
    if (this.Travellers > 9) {
      $('#liTravellers').popover('show');
    } else {
      $('#liTravellers').popover('hide');
    }
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
        '<span><i class=\'fa fa-exclamation-triangle\'></i> Enter valid To airport</span>';
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
          '<span><i class=\'fa fa-exclamation-triangle\'></i> From & To airports cannot be the same</span>';
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
      $('#liTravellers').popover('show');
      isValid = false;
    } else {
      $('#liTravellers').popover('hide');
    }

    if (!isValid) {
      return;
    }

    const filters = new FlightFiltersModel();
    filters.originLocation = this.originLocation;
    filters.destinationLocation = this.destinationLocation;
    filters.travelClass = this.travelClass;
    filters.adult = parseInt(this.adult.toString());
    filters.child = parseInt(this.child.toString());
    filters.infant = parseInt(this.infant.toString());
    filters.leaveDate = this.leaveDate;
    filters.returnDate = this.returnDate;

    localStorage.setItem('filters', JSON.stringify(filters));
    // document.location.href = "/search-results";

    // this.router.navigate([]).then(result => {  window.open('/search-results', '_blank'); });
    this.router.navigate(['/search-results']);
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    let owl1 = $('#slider1');
    owl1.owlCarousel({
      loop: true,
      margin: 10,
      // center:true,
      autoplayTimeout: 5000,
      smartSpeed: 450,
      dots: true,
      nav: true,
      navText: [
        '<i class=\'fa fa-angle-left\'></i>',
        '<i class=\'fa fa-angle-right\'></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        800: {
          items: 4,
        },
      },
    });

    let owl2 = $('#slider2');
    owl2.owlCarousel({
      loop: true,
      margin: 10,
      // center:true,
      autoplayTimeout: 5000,
      smartSpeed: 450,
      dots: true,
      nav: true,
      navText: [
        '<i class=\'fa fa-angle-left\'></i>',
        '<i class=\'fa fa-angle-right\'></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        800: {
          items: 4,
        },
      },
    });

    // add class and remove class

    $(document).ready(function() {
      $('.book-details1').click(function() {
        $('.selectbox1').addClass('select1');
        $('.book-peron1').removeClass('bookon');
        $('.book-peron2').removeClass('economy');

        $('.selectbox2').removeClass('select2');
      });

      $('.hrtlCenter').on('click', function(event) {
        $('.selectbox1').removeClass('select1');
      });
    });

    $(document).ready(function() {
      $('.book-details2').click(function() {
        $('.selectbox1').removeClass('select1');
        $('.book-peron1').removeClass('bookon');
        $('.book-peron2').removeClass('economy');

        $('.selectbox2').addClass('select2');
      });

      $('.hrtlCenter').on('click', function(event) {
        $('.selectbox2').removeClass('select2');
      });
    });

    $(document).ready(function() {
      $('body').click(function(e) {
        if ($(e.target).closest('#adult-details').length) {
        } else {
          $('.book-peron1').removeClass('bookon');
        }

        if ($(e.target).closest('#class-details').length) {
        } else {
          $('.book-peron2').removeClass('economy');
        }
      });
    });

    $(document).ready(function() {
      $('.adult-details').click(function() {
        $('.selectbox1').removeClass('select1');
        $('.selectbox2').removeClass('select2');
        $('.book-peron2').removeClass('economy');
        $('.book-peron1').addClass('bookon');
      });

      $('.adult-btn a').click(function() {
        $('.book-peron1').removeClass('bookon');
      });
    });

    $(document).ready(function() {
      $('.class-details').click(function() {
        $('.selectbox1').removeClass('select1');
        $('.selectbox2').removeClass('select2');
        $('.book-peron1').removeClass('bookon');
        $('.book-peron2').addClass('economy');
      });

      $('#rbTravelClassEconomy').click(function() {
        $('.book-peron2').removeClass('economy');
      });

      // $(document).on("click", function (event) {      //
      //   if (!$(event.target).closest(".book-box").length) {
      //     $(".selectbox1").removeClass("select1");
      //     $(".selectbox2").removeClass("select2");
      //     $(".book-peron1").removeClass("bookon");
      //     $(".book-peron2").removeClass("economy");
      //   }
      // });

      $('.dates').click(() => {
        $('.selectbox1').removeClass('select1');
        $('.selectbox2').removeClass('select2');
        $('.book-peron1').removeClass('bookon');
        $('.book-peron2').removeClass('economy');
      });
    });

    $('.book-peron .buisness li a').click(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $('.book-peron .buisness li a.active').removeClass('active');
        $(this).addClass('active');
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next(0);
    this.unsubscribeAll.complete();
  }

  getFilters() {
    const filters = localStorage.getItem('filters');
    return filters ? true : false;
  }

  clearFilters() {
    localStorage.removeItem('filters');
    this.tripType = TripType.OneWay;
    this.departureCity = 'From';
    this.arrivalCity = 'To';
    this.departureAirportName = 'International Airport';
    this.departureTitle = 'International Airport';
    this.arrivalAirportName = 'International Airport';
    this.arrivalTitle = 'International Airport';
    this.departureAirportResults = new Array<AirportEntity>();
    this.arrivalAirportResults = new Array<AirportEntity>();
    this.travelClass = 'Y'; // Economy
    this.travelClassName = Common.getTravelClassName(this.travelClass);
    this.adult = 1;
    this.child = 0;
    this.infant = 0;
    this.leaveDate = moment().add(1, 'days').toDate();
    this.singleDatePicker(true);
    // localStorage.removeItem("airports");
    // this.getAirports();
    const me = this;
    $('#txtFrom').keyup(function() {
      clearTimeout(me.typingTimer);
      this.typingTimer = setTimeout(() => {
        me.searchDeparture();
      }, me.doneTypingInterval);
    });
    $('#txtTo').keyup(function() {
      clearTimeout(me.typingTimer);
      this.typingTimer = setTimeout(() => {
        me.searchArrival();
      }, me.doneTypingInterval);
    });
    $(document).ready(function() {
      $('[data-toggle="popover"]').popover({ html: true });
    });
  }

  hideDepartureAirportResults() {
    $('.selectbox1').removeClass('select1');
  }

  hideArrivalAirportResults() {
    $('.selectbox2').removeClass('select2');
  }
}

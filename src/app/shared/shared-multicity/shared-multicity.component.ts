import {
  Component,
  OnInit,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import Lightpick from 'src/assets/js/lightpick.min.js';
import * as moment from 'moment';
import { TripType } from 'src/app/models/enums.model';
import { AirportEntity } from 'src/app/home/entities/airport-entity.model';
import { PrimeNGConfig } from 'primeng/api';
import { HomeService } from 'src/app/home/shared/home.service';
import { ToasterService } from 'src/app/services/toastr-service';
declare var $: any;

@Component({
  selector: 'app-shared-multicity',
  templateUrl: './shared-multicity.component.html',
  styleUrls: ['./shared-multicity.component.scss'],
})
export class SharedMulticityComponent implements OnInit, OnChanges {
  constructor(
    private homeService: HomeService,
    private toasterService: ToasterService,
    private primengConfig: PrimeNGConfig
  ) {}
  rangePicker: any;
  singlePicker: any;
  returnDate: any;
  leaveDate: any[];
  tripType: TripType;
  airports: Array<AirportEntity>;
  departureTitle: string;
  departureAirportName: string;
  arrivalTitle: string;
  liArrivalErrMsg: string;
  departureCity: string;
  arrivalCity: string;
  arrivalAirportName: string;
  arrivalAirportResults: Array<AirportEntity>;
  departureAirportResults: Array<AirportEntity>;
  popularCities = [];
  multicityData: any = [];
  isSuggest = true;

  typingTimer: any; // timer identifier
  doneTypingInterval = 1000; // time in ms (1 second)
  selectedIndex: any;

  @Input()
  public showHomeSearch = true;

  @Input()
  public showDefaultSearchRow = true;

  @Input()
  public multiCityValues: any = [];

  @Output() onSearch = new EventEmitter<any>();
  @Output() onUpdateMultiCity = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    // tslint:disable-next-line: forin
    for (const property in changes) {
      if (property === 'multiCityValues') {
        this.multicityData = changes[property].currentValue;
      }
      if (property === 'showHomeSearch') {
        this.showHomeSearch = changes[property].currentValue;
      }
    }
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    console.log(this.multiCityValues);
    if (this.showDefaultSearchRow && this.multiCityValues.length === 0) {
      this.createBlankFormArray();
    }
    this.getAirports();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.hideFromAirportResults(this.selectedIndex);
      this.hideToAirportResults(this.selectedIndex);
    }
  }

  createBlankFormArray() {
    this.multicityData.push({
      departureCode: '',
      departureCity: '',
      departureTitle: '',
      departureAirportName: '',
      arrivalCode: '',
      arrivalCity: '',
      arrivalTitle: '',
      arrivalAirportName: '',
      departureDate: moment(new Date()).add(1, 'days').toDate(),
      departureDisplayDate: moment(new Date()).add(1, 'days').toDate(),
    });
  }
  removeMulticityData(i) {
    this.multicityData.splice(i, 1);
  }
  fromClick(index) {
    this.selectedIndex = index;
    $('.selectbox1').removeClass('select1');
    $('.selectbox2').removeClass('select2');
    this.hideFromToAirports(index);
    $('.selectmulticityboxFrom' + index).addClass('select1');
    $('#txtFromCity' + index).focus();
  }

  toClick(index) {
    this.selectedIndex = index;
    $('.selectbox1').removeClass('select1');
    $('.selectbox2').removeClass('select2');
    this.hideFromToAirports(index);
    $('.selectmulticityboxTo' + index).addClass('select2');
    $('#txtFromCity' + index).focus();
  }

  hideFromToAirports(index) {
    for (let i = 0; i < this.multicityData.length; i++) {
      this.hideFromAirportResults(i);
      this.hideToAirportResults(i);
    }
  }

  searchDeparturePopup(index) {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.searchDeparture(index);
    }, this.doneTypingInterval);
  }

  searchArrivalPopup(index) {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.searchArrival(index);
    }, this.doneTypingInterval);
  }

  searchDeparture(index) {
    const value = $('#txtFromCity' + index).val();
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
  searchArrival(index) {
    const value = $('#txtToCity' + index).val();
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

  selectedFrom(airport: AirportEntity, index) {
    const getData = this.multicityData[index];
    getData.departureCode = airport.code;
    getData.departureCity = airport.city;
    getData.departureTitle =
      airport.code + ', ' + airport.name + ' ' + airport.country;
    if (getData.departureTitle.length > 30) {
      getData.departureAirportName =
        getData.departureTitle.substr(0, 30) + '...';
    } else {
      getData.departureAirportName = getData.departureTitle;
    }
    this.multicityData[index] = getData;
    $('#txtFromCity' + index).val('');
    this.onUpdateMultiCity.emit('UpdateValue');
    // this.validateOriginLocation();
    // this.validateFromAndToAirports();
  }
  selectedTo(airport: AirportEntity, index) {
    const getData = this.multicityData[index];
    getData.arrivalCode = airport.code;
    getData.arrivalCity = airport.city;
    getData.arrivalTitle =
      airport.code + ', ' + airport.name + ' ' + airport.country;
    if (getData.arrivalTitle.length > 30) {
      getData.arrivalAirportName = getData.arrivalTitle.substr(0, 30) + '...';
    } else {
      getData.arrivalAirportName = getData.arrivalTitle;
    }
    this.multicityData[index] = getData;
    $('#txtToCity' + index).val('');
    this.onUpdateMultiCity.emit('UpdateValue');
    // this.destinationLocation = airport.code;
    // this.arrivalCity = airport.city;
    // this.arrivalTitle =
    //   airport.code + ', ' + airport.name + ' ' + airport.country;
    // if (this.arrivalTitle.length > 30) {
    //   this.arrivalAirportName = this.arrivalTitle.substr(0, 30) + '...';
    // } else {
    //   this.arrivalAirportName = this.arrivalTitle;
    // }
    // this.arrivalAirportResults = new Array<AirportEntity>();
    // $('#txtTo').val('');
    // this.validateDestinationLocation();
    // this.validateFromAndToAirports();
  }

  hideFromAirportResults(index) {
    $('.selectmulticityboxFrom' + index).removeClass('select1');
  }
  hideToAirportResults(index) {
    $('.selectmulticityboxTo' + index).removeClass('select2');
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

  singleDatePicker(index, data, isInitial: boolean = false) {
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
      field: document.getElementById('dpLeaveDate' + index),
      numberOfMonths: 2,
      startDate: this.leaveDate,
      minDate: moment().toDate(),
      onSelect: (sdate) => {
        const getData = this.multicityData[index];
        getData.departureDate = sdate;
        getData.departureDisplayDate = sdate;
        this.multicityData[index] = getData;
      },
    });

    if (!isInitial) {
      this.singlePicker.show();
    }
  }
}

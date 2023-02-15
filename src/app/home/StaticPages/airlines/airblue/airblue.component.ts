import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FlightModel } from 'src/app/home/models/flight.model';
import { AirlineFliterModel, SearchResultModel, StopFilterModel } from 'src/app/home/models/search-result.model';
import { HomeService } from 'src/app/home/shared/home.service';
import { ToasterService } from 'src/app/services/toastr-service';

@Component({
  selector: 'app-airblue',
  templateUrl: './airblue.component.html',
  styleUrls: ['./airblue.component.scss']
})
export class AirblueComponent implements OnInit {
  searchResult: SearchResultModel;
  bestFlight: FlightModel;
  cheapestFlight: FlightModel;
  fastestFlight: FlightModel;

  flightResult: any;
  flights: any[] = [];
  altDaysFlights: any[] = [];
  
  searchResultsErrMsg: string;
  constructor(private router: Router,
    private homeService: HomeService,
    private toasterService: ToasterService) { }
  isShowContent = true;
  ngOnInit(): void {
    this.searchFlight();
  }

  searchFlight() {
    var today = moment();
    var dayAfterTomorrow = moment(today).add(3, 'days').toDate();
    const filters = {
      destinationLocation: 'LHE',
      departureAirportName: 'LHE, Alama Iqbal International...',
      departureTitle: 'LHE, Alama Iqbal International Airport Pakistan',
      originLocation: 'KHI',
      arrivalAirportName: 'KHI, Jinnah Interna...',
      arrivalTitle: 'KHI, Jinnah International Airport',
      leaveDate: new Date(dayAfterTomorrow).toISOString(),
      returnDate: null,
      isDirectFlightOnly: true,
      travelClass: 'Economy',
      child: 0,
      infant: 0,
      adult: 1,
      updateDefaults: true,
      multiCities: JSON.stringify([]),
    };

    localStorage.setItem('filters', JSON.stringify(filters));

    // this.router.navigateByUrl('/search-results?' + this.objectToQueryString(filters), {
    //   state: filters,
    // });

    this.homeService.searchFlights(filters).subscribe((response) => {
      // this.isLoaded = true;
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            //localStorage.setItem('flightResult', response.data);
            // this.searchResultEvent.emit(response.data);
            this.searchResult = JSON.parse(JSON.stringify(response.data));
            this.flightResult = JSON.parse(JSON.stringify(response.data));
            this.flights = [];
            this.altDaysFlights = JSON.parse(
              JSON.stringify(response.data.altDaysFlights)
            );
            const flightsArray = [];
            this.searchResult.flights.forEach((o) => {
              // flightsArray.push(o);
              const list = this.searchResult.flights.filter(
                (i) =>
                  i.originLocation === o.originLocation &&
                  i.destinationLocation === o.destinationLocation &&
                  i.totalFare === o.totalFare
              );
              const finalResult = list.filter((x) => x.flightId != o.flightId);
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
              JSON.stringify(this.flights)
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
            // this.loadDates();
          }
        } else {
          this.searchResult.flights = new Array<FlightModel>();
          if (response.message) {
            this.searchResultsErrMsg = response.message;
          } else {
            // this.isLoaded = false;
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
        // this.isLoaded = false;
        this.toasterService.showError(
          'Search Result Err 2: Unknown; Try Again',
          'Error'
        );
      }
    });
    // this.router.navigateByUrl('/search-results?' + this.objectToQueryString(filters), {
    //   state: filters,
    // });
  }

  reviewBooking(flight: any,fareIndex: any) {
    if (fareIndex >= 0)
    {
      console.log(flight.farePrices[fareIndex]);
      flight.fareDetails.farePrices = Object.assign({},flight.farePrices[fareIndex])
      if (flight.airlineType == 'LCC' && flight.flightSegments)
      {
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

  searchResultss(data: string) {
    this.isShowContent = false;
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

  
}

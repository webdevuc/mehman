import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { ApiCallService } from '../../services/api-call.service';
import { ApiResultModel } from '../../models/api-result.model';
import { FlightFiltersModel } from '../models/flight-filters.model';
import { BookingEntityModel } from '../entities/booking-entity.model';
import { CommonService } from '../../services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // This is used to create new booking
  // private booking = new BehaviorSubject<BookingEntityModel>(null);
  // currentBooking = this.booking.asObservable();
  // sendBooking(newBooking: BookingEntityModel) {
  //  this.booking.next(newBooking);
  // }

  private searchFlightsUrl = `${environment.searchApiUrl}/FlightSearch/SearchFlights`;
  private searchAirBlueFlightsUrl = `${environment.searchApiUrl}/LCCFlights/SearchAirBlueFlights`;
  // private searchFlightsUrl = this.commonService.searchEngineApiEndPoint + "/FlightSearch/SearchFlights";
  private saveBookingUrl = `${environment.bookingApiUrl}/Booking/Save`;
  // private saveBookingUrl = this.commonService.bookingsApiEndPoint + "/Booking/SaveBooking";
  private getAllAirportsUrl = `${environment.commonApiUrl}/Airport/GetAll`;
  private getAirportsSearchUrl = `${environment.commonApiUrl}/Airport/Search`;
  private getAirportByCodeUrl = `${environment.commonApiUrl}/Airport/AirportByCode`;
  private getPopularAirportsUrl = `${environment.commonApiUrl}/Airport/GetPopular`;
  // private getAllAirportsUrl = this.commonService.commonApiEndPoint + "/Airport/GetAll";
  private getAllBranchesUrl = `${environment.bookingApiUrl}/Branch/GetAll`;
  // private getAllBranchesUrl = this.commonService.bookingsApiEndPoint + "/Branch/GetAll";
  private getBlogsForHomeUrl =
    environment.adminApiUrl + '/BlogPost/GetAllForHome';
  private getOffersForHomeUrl =
    environment.adminApiUrl + '/Offer/GetAllForHome';

  constructor(
    private api: ApiCallService,
    private commonService: CommonService
  ) {}

  // searchFlights(model: FlightFiltersModel): Observable<ApiResultModel> {
  //   return this.api.post<ApiResultModel>(this.searchFlightsUrl, model);
  // }

  // searchFlights(model: FlightFiltersModel): Observable<ApiResultModel> {
  //   return this.api.get<ApiResultModel>(`${this.searchFlightsUrl}?originLocation=${model.originLocation.trim()}&destinationLocation=${model.destinationLocation.trim()}&leaveDate=${model.leaveDate}&returnDate=${model.returnDate??''}&isDirectFlightOnly=${model.isDirectFlightOnly}&travelClass=${model.travelClass.trim()}&adult=${model.adult}&child=${model.child}`,"Search Fligths"
  //    , new ApiResultModel());
  // }

  searchFlights(model: any): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${
        this.searchFlightsUrl
      }?originLocation=${model.originLocation.trim()}&destinationLocation=${model.destinationLocation.trim()}&leaveDate=${
        model.leaveDate
      }&returnDate=${model.returnDate ?? ''}&isDirectFlightOnly=${
        model.isDirectFlightOnly
      }&travelClass=${model.travelClass.trim()}&adult=${model.adult}&child=${
        model.child
      }&infant=${model.infant}&multiCity=${model.multiCities}&roleName=${
        model.roleName
      }&trip=${model.tripType ?? 'one_way'}`,
      'Search Fligths',
      new ApiResultModel()
    );
  }

  searchAirBlueFlights(model: any): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${
        this.searchAirBlueFlightsUrl
      }?trip=${model.tripType ?? 'one_way'}&originLocation=${model.originLocation.trim()}&destinationLocation=${model.destinationLocation.trim()}&leaveDate=${
        model.leaveDate
      }&returnDate=${model.returnDate ?? ''}&route=${model.route ?? ''}`,
      'Search Fligths',
      new ApiResultModel()
    );
  }

  handShake(params: any): Observable<any> {
    const url = `https://sandbox.bankalfalah.com/HS/api/HSAPI/HSAPI`

    return this.api.post<any>(url, params)
  }


  initiateTransaction(params: any): Observable<any> {
    const url = `https://sandbox.bankalfalah.com/HS/api/ProcessTran/ProTran`

    return this.api.post<any>(url, params)
  }

  makeTransaction(params: any): Observable<any> {
    const url = `https://sandbox.bankalfalah.com/HS/api/ProcessTran/ProTran`

    return this.api.post<any>(url, params)
  }
  
  saveBooking(model: BookingEntityModel): Observable<ApiResultModel> {
    return this.api.post<ApiResultModel>(this.saveBookingUrl, model);
  }

  getAllAirports(): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getAllAirportsUrl,
      'Get All Airports',
      new ApiResultModel()
    );
  }

  getAirportsSearch(data: any): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getAirportsSearchUrl + '?data=' + data,
      'Get Search By Airports',
      new ApiResultModel()
    );
  }

  getAirportByCode(data: any): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getAirportByCodeUrl + '?data=' + data,
      'Get Search By Airport By Code',
      new ApiResultModel()
    );
  }

  getPopularAirports(): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getPopularAirportsUrl,
      'Get Popular Airports',
      new ApiResultModel()
    );
  }

  getAllBranches(): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getAllBranchesUrl,
      'Get All Branches',
      new ApiResultModel()
    );
  }

  requestDataFromMultipleSources(): Observable<any[]> {
    const allAirports = this.api.get<ApiResultModel>(
      this.getAllAirportsUrl,
      'Get All Airports',
      new ApiResultModel()
    );
    const popularAirports = this.api.get<ApiResultModel>(
      this.getPopularAirportsUrl,
      'Get Popular Airports',
      new ApiResultModel()
    );
    const offersForHome = this.api.get<ApiResultModel>(
      this.getOffersForHomeUrl,
      'Get Offers for home',
      new ApiResultModel()
    );
    const blogsForHome = this.api.get<ApiResultModel>(
      this.getBlogsForHomeUrl,
      'Get Blogs for home',
      new ApiResultModel()
    );
    return forkJoin([
      allAirports,
      popularAirports,
      offersForHome,
      blogsForHome,
    ]);
  }
}

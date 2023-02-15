import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResultModel } from '../models/api-result.model';
import { ApiCallService } from '../services/api-call.service';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private getBookingsUrl = `${environment.bookingApiUrl}/Booking/GetAll`;
  // private getBookingsUrl = this.commonService.bookingsApiEndPoint + '/Booking/GetBookings';
  private getBookingUrl = `${environment.bookingApiUrl}/Booking/Get`;
  private ticketBookingUrl = environment.bookingApiUrl + '/Booking/Book';
  private cancelBookingUrl = environment.bookingApiUrl + '/Booking/Cancel';

  constructor(
    private api: ApiCallService,
    private commonService: CommonService
  ) {}

  getBookings(): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getBookingsUrl,
      'Get My Bookings',
      new ApiResultModel()
    );
  }

  getBooking(id: any): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${this.getBookingUrl}?bookingId=${id}`,
      'Get Booking',
      new ApiResultModel()
    );
  }

  cancelBooking(model: any): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${this.cancelBookingUrl}?id=${model.id}&cancelReason=${model.cancelReason}`,
      'Cancel Booking',
      new ApiResultModel()
    );
  }

  ticketBooking(model: any): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${this.ticketBookingUrl}?id=${model.id}&isPaymentReceived=${model.isPaymentReceived}&paymentMethod=${model.paymentMethod}`,
      'Ticket Booking',
      new ApiResultModel()
    );
  }
}

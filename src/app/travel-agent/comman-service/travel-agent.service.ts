import { Observable } from 'rxjs';
import { ApiResultModel } from './../../models/api-result.model';
import { ApiCallService } from './../../services/api-call.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TravelAgentService {
  private airlineApiUrl = `${environment.commonApiUrl}/Airline`;
  private airBookingApiUrl = `${environment.bookingApiUrl}/Booking`;
  private airLedgerApiUrl = `${environment.bookingApiUrl}/Ledger`;
  constructor(private api: ApiCallService) { }


  // Get All Airline list
  getAirlines() {
    return this.api.get<ApiResultModel>(
      this.airlineApiUrl + '/GetAll', 'Get Airlines list',
      new ApiResultModel()
    );
  }

  // Get view all refund request list
  getViewRefundRequests() {
    return this.api.get<ApiResultModel>(
      this.airBookingApiUrl + '/GetAllRefund', 'Get Refunds list',
      new ApiResultModel()
    );
  }

  // Get view all refund request list
  getRefundById(id: any) {
    return this.api.get<ApiResultModel>(
      this.airBookingApiUrl + '/GetByIdRefund?id=' + id, 'Get Refund by id',
      new ApiResultModel()
    );
  }

  // Post refund details
  postRefundDetails(details: any): Observable<ApiResultModel> {
    return this.api.post<ApiResultModel>(this.airBookingApiUrl + '/RefundSave', details);
  }

  // Update refund details 
  putRefundDetails(details: any): Observable<ApiResultModel> {
    return this.api.post<ApiResultModel>(this.airBookingApiUrl + '/RefundUpdate', details);
  }

  // save payment
  postPaymentDetails(details: any): Observable<ApiResultModel> {
    return this.api.postImage<ApiResultModel>(this.airBookingApiUrl + '/PaymentSave', details)
  }

  // get ledger 
  getAgentLedger(param?: any) {
    let fullUrl: string = this.airLedgerApiUrl + '/GetAllAgentLedger';
    if (param) {
      Object.entries(param).forEach(([key, val]) =>
        fullUrl = this.appendQueryParam(fullUrl, key, val)
      );
    }
    return this.api.get<ApiResultModel>(
      fullUrl, 'Get ledger details',
      new ApiResultModel()
    );
  }

  getAgentLedgerDetail(param?: any){
    let fullUrl: string = this.airLedgerApiUrl + '/GetAgentLedgerDetail';
    if (param) {
      Object.entries(param).forEach(([key, val]) =>
        fullUrl = this.appendQueryParam(fullUrl, key, val)
      );
    }
    return this.api.get<ApiResultModel>(
      fullUrl, 'Get ledger details',
      new ApiResultModel()
    );
  }

  getRequestType() {
    return [
      { id: 1, name: 'Refund', key: 'refund' },
      // { id: 2, name: 'Void', key: 'void' },
    ]
  }
  getRefundType() {
    return [
      { id: 1, name: 'Full Refund', key: 'full refund' },
      { id: 2, name: 'Half Refund', key: 'half refund' },
    ]
  }

  getPaymentmethod() {
    return [
      { id: 1, key: 'cash', name: 'Cash' },
      { id: 2, key: 'internet-banking', name: 'Internet Banking' },
      { id: 3, key: 'cheque', name: 'Cheque' },
      { id: 4, key: 'other', name: 'Other' }
    ]
  }
  getAccounts() {
    return [
      { id: 1, name: 'Meezan Bank', accountNumber: '0251231231' },
      { id: 2, name: 'Standard Chartered', accountNumber: '123213123123' },
      { id: 3, name: 'Summit Bank', accountNumber: '123123123123' },
      { id: 4, name: 'Cash', accountNumber: '123123123123' }
    ]
  }

  appendQueryParam(url: string, paramName?: any, value?: any): string {
    if (value !== null && value !== undefined && value) {
      if (url.includes('?')) {
        return url + '&' + paramName + '=' + value;
      } else {
        return url + '?' + paramName + '=' + value;
      }
    } else {
      return url;
    }
  }
}


export interface RequestType {
  id: number,
  name: string,
  key: string
}
export interface RefundType {
  id: number,
  name: string,
  key: string
}
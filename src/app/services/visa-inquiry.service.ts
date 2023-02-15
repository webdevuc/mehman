import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResultModel } from '../models/api-result.model';
import { ApiCallService } from './api-call.service';

@Injectable({
  providedIn: 'root',
})
export class VisaInquiryService {
  private createVisaInquiryUrl = environment.adminApiUrl + '/VisaInquiry/Save';
  constructor(private api: ApiCallService) {}

  createVisaInquiry(visaInquiry: any): Observable<ApiResultModel> {
    return this.api.post<ApiResultModel>(
      this.createVisaInquiryUrl,
      visaInquiry
    );
  }
}

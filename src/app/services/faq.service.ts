import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResultModel } from '../models/api-result.model';
import { ApiCallService } from './api-call.service';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private getFaqByCountryUrl = environment.adminApiUrl + '/Faq/GetFaqByCountry';
  constructor(private api: ApiCallService) {}

  getFaqByCountry(country: any): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${this.getFaqByCountryUrl}?country=${country}`,
      'Get FAQ by Country',
      new ApiResultModel()
    );
  }
}

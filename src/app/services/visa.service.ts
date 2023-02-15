import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResultModel } from '../models/api-result.model';
import { ApiCallService } from './api-call.service';

@Injectable({
  providedIn: 'root',
})
export class VisaService {
  private getCountryUrl =
    environment.adminApiUrl + '/VisaDetail/GetCountryByVisaDetails';
  private getVisaDetailsByCountryUrl =
    environment.adminApiUrl + '/VisaDetail/GetVisaDetailsByCountry';

  constructor(private api: ApiCallService) {}

  getVisaCountry(): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getCountryUrl,
      'Get Visa Country',
      new ApiResultModel()
    );
  }

  getVisaDetailsByCountry(country: any): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${this.getVisaDetailsByCountryUrl}?country=${country}`,
      'Get Visa Details by Country',
      new ApiResultModel()
    );
  }
}

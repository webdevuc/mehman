import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResultModel } from '../models/api-result.model';
import { TravelAgentService } from '../travel-agent/comman-service/travel-agent.service';
import { ApiCallService } from './api-call.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  subjectBalance = new Subject<boolean>();
  private newsLetterSubscriptionUrl = `${environment.commonApiUrl}/common/newslettersubcription`;
  private contactUsUrl = `${environment.commonApiUrl}/common/contactUs`;
  private countryTagsUrl = `${environment.commonApiUrl}/common/countryTags`;

  constructor(private api: ApiCallService,private travelAgentService: TravelAgentService,
    private cookieService: CookieService) { }

  contactUs(contactUsModel: any): Observable<ApiResultModel> {
    return this.api.post<ApiResultModel>(this.contactUsUrl, contactUsModel);
  }

  newsLetterSubcription(email: string) {
    return this.api.get<ApiResultModel>(
      this.newsLetterSubscriptionUrl + '?email=' + email,
      'News Letter Subscription',
      new ApiResultModel()
    );
  }

  getCountryTags(countryName: string) {
    return this.api.get<ApiResultModel>(
      this.countryTagsUrl + '?countryName=' + countryName, 'Get Country Tags',
      new ApiResultModel()
    );
  }
  
  UpdateAgentBalance(param?: any) {

    this.travelAgentService.getAgentLedgerDetail(param).subscribe(response => {      
      if (response.status == 'success') {        
        let balance = response.data[response.data.length - 1].balance;

        this.cookieService.set('bl', balance, 2, '/');        
      }
    });
  }
}

export enum Status {
  Pending = 1,
  Processing = 2,
  Completed = 3,
  Rejected = 4,
}
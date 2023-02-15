import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResultModel } from 'src/app/models/api-result.model';
import { ApiCallService } from 'src/app/services/api-call.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private getOffersUrl = environment.adminApiUrl + '/Offer/GetAll';
  private getOffersForHomeUrl =
    environment.adminApiUrl + '/Offer/GetAllForHome';
  private getOfferUrl = environment.adminApiUrl + '/Offer/Get';
  private getOffersByCategoryUrl =
    environment.adminApiUrl + '/Offer/GetAllByCategory';
  private getOffersBySubCategoryUrl =
    environment.adminApiUrl + '/Offer/GetAllBySubCategory';
  private getMostViewedOffersUrl =
    environment.adminApiUrl + '/Offer/GetMostViewed';
  constructor(private api: ApiCallService) {}

  getOffers(): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getOffersUrl,
      'Get Offers',
      new ApiResultModel()
    );
  }

  getOffersForHome(): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getOffersForHomeUrl,
      'Get Offers for home',
      new ApiResultModel()
    );
  }

  getOffer(id: any): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${this.getOfferUrl}?id=${id}`,
      'Get Offer',
      new ApiResultModel()
    );
  }

  getOffersByCategory(categoryId): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${this.getOffersByCategoryUrl}?offerCategory=${categoryId}`,
      'Get Offers by category',
      new ApiResultModel()
    );
  }

  getOffersBySubCategory(category, subcategory): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${this.getOffersBySubCategoryUrl}?offerCategory=${category}&offerSubCategory=${subcategory}`,
      'Get Offers by category',
      new ApiResultModel()
    );
  }

  getMostViewedOffers(): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getMostViewedOffersUrl,
      'Get Most viewed Offers',
      new ApiResultModel()
    );
  }
}

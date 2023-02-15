import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResultModel } from 'src/app/models/api-result.model';
import { ApiCallService } from 'src/app/services/api-call.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {

  private getBlogsUrl = environment.adminApiUrl + '/BlogPost/GetAll';
  private getBlogsForHomeUrl = environment.adminApiUrl + '/BlogPost/GetAllForHome';
  private getBlogUrl = environment.adminApiUrl + '/BlogPost/Get';
  private getBlogsByCategoryUrl = environment.adminApiUrl + '/BlogPost/GetAllByCategory';
  private getMostViewedBlogsUrl = environment.adminApiUrl + '/BlogPost/GetMostViewed';
  constructor(
    private api: ApiCallService  ) { }

  getBlogs(): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getBlogsUrl,
      'Get Blogs',
      new ApiResultModel()
    );
  }

  getBlogsForHome(): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getBlogsForHomeUrl,
      'Get Blogs for home',
      new ApiResultModel()
    );
  }

  getBlog(id: any): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${this.getBlogUrl}?id=${id}`,
      'Get Blog',
      new ApiResultModel()
    );
  }

  getBlogsByCategory(categoryId): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${this.getBlogsByCategoryUrl}?blogPostCategory=${categoryId}`,
      'Get Blogs by category',
      new ApiResultModel()
    );
  }

  getMostViewedBlogs(): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      this.getMostViewedBlogsUrl,
      'Get Most viewed Blogs',
      new ApiResultModel()
    );
  }


}

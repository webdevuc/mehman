import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResultModel } from 'src/app/models/api-result.model';
import { ApiCallService } from 'src/app/services/api-call.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogsCommentsService {

  private getBlogsCommentsUrl = environment.adminApiUrl + '/BlogPostComments/GetAllByBlogPost';
  private createBlogCommentUrl = environment.adminApiUrl + '/BlogPostComments/Save';

  constructor(
    private api: ApiCallService  ) { }

  createBlogComment(blogComment: any): Observable<ApiResultModel> {
    return this.api.post<ApiResultModel>(this.createBlogCommentUrl, blogComment);
  }

  getBlogsComments(blogId): Observable<ApiResultModel> {
    return this.api.get<ApiResultModel>(
      `${this.getBlogsCommentsUrl}?blogPostId=${blogId}`,
      'Get Blogs by category',
      new ApiResultModel()
    );
  }


}

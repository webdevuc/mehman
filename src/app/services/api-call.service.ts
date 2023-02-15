import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  // Default local api
  // private preUrl = "https://localhost:44350/api";

  // Default test server api
  // private preUrl = "http://localhost:8081/api";

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    // Production api path
    if (environment.production) {
      // this.preUrl = '/app/api';
    }
  }

  get<T>(
    url: string,
    operation: string,
    defaultValue: T,
    showLoader: boolean = true
  ): Observable<T> {
    // url = this.preUrl + url;

    if (showLoader) {
      this.loaderService.display(true);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken(),
      }),
    };

    return this.http.get<T>(url, httpOptions).pipe(
      map((res) => {
        this.loaderService.display(false);
        return res;
      }),
      catchError(this.handleError(operation, defaultValue))
    );
  }

  postImage<T>(
    url: string,
    data: object,
    showLoader: boolean = true
  ): Observable<T> {
    if (showLoader) {
      this.loaderService.display(true);
    }

    // url = this.preUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken(),
      }),
    };

    return this.http.post<T>(url, data, httpOptions).pipe(
      map((res) => {
        this.loaderService.display(false);
        return res;
      }),
      catchError(this.handleError('', null))
    );
  }

  post<T>(
    url: string,
    data: object,
    showLoader: boolean = true
  ): Observable<T> {
    if (showLoader) {
      this.loaderService.display(true);
    }

    // url = this.preUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken(),
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<T>(url, data, httpOptions).pipe(
      map((res) => {
        this.loaderService.display(false);
        return res;
      }),
      catchError(this.handleError('', null))
    );
  }

  // Not used
  // private handleErrorObservable(error: Response | any) {
  //   this.loaderService.display(false);
  //   console.error(error.message || error);
  //   return Observable.throwError(error.message || error);
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.loaderService.display(false);

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      switch (error.status) {
        case 404:
          console.error(error); // log to console instead
          break;

        case 403:
          // this.snackBar.open("You don't have permission to perform this operation.", "", {
          //    duration: 5000,
          // });
          console.log('You don\'t have permission to perform this operation.');
          console.error(error);
          // alert("You don't have permission to perform this operation.");
          break;

        case 401:
          console.log('Unauthorized');
          this.setUserLoggedOut();
          break;
      }

      if (error.status >= 500) {
        console.error(error);
        console.error('Development error. Please contact customer support');
        // this.snackBar.open(error.message, "", {
        //    duration: 5000,
        // });
        // alert(error.message);
      }

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getToken() {
    return this.cookieService.get('token');
  }

  setUserLoggedOut() {
    // this.cookieService.delete("loggedOut", '/');
    // this.cookieService.delete("email", "/");
    // this.cookieService.delete("loggedIn", "/");
    // this.cookieService.delete("token", "/");
    // this.cookieService.delete("r", "/");
    // this.cookieService.delete("fn", "/");
    // this.cookieService.delete("ln", "/");
    // this.cookieService.delete("cn", "/");
    // this.cookieService.delete("ls", "/");
    // this.cookieService.delete("usls", "/");
    // localStorage.removeItem("pi");
    // this._fuseNavigationService.unregister('main');
    // this.assignBrowserLanguage();
    // this.router.navigate(['/auth/login']);
  }
}

import { Component, OnInit, OnDestroy, Type, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, interval, retryWhen, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from './services/loader.service';

import { AuthService } from './auth/shared/auth.service';
import { FooterComponent } from './footer/footer.component';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  get isHome(): boolean {
    return this.checkRoute();
  }

  footerComponent: Promise<Type<FooterComponent>>;
  showLoader: boolean;
  private commonAPIUrl = `${environment.commonApiUrl}/health`;
  private bookingAPIUrl = `${environment.bookingApiUrl}/health`;
  private searchAPIUrl = `${environment.searchApiUrl}/health`;
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const me = this;
    this.loaderService.status.subscribe((val: boolean) => {
      setTimeout(() => {
        me.showLoader = val;
      });
    });

    this.checkCommonAPIHealth();
    this.checkBookingAPIHealth();
    this.checkSearchAPIHealth();
  }

  checkCommonAPIHealth() {
    this.authService
      .healthCheck(this.commonAPIUrl)
      .pipe(
        tap(
          (data) => {
            console.log('Check CommonAPI Health :->' + data);
          },
          (error) => {
            console.log('Check CommonAPI Health :->' + error.statusText);
          }
        ),
        retryWhen((errors) => errors.pipe(delay(300000)))
      )
      .subscribe();
  }

  checkSearchAPIHealth() {
    this.authService
      .healthCheck(this.searchAPIUrl)
      .pipe(
        tap(
          (data) => {
            console.log('Check SearchAPI Health :->' + data);
          },
          (error) => {
            console.log('Check SearchAPI Health :->' + error.statusText);
          }
        ),
        retryWhen((errors) => errors.pipe(delay(300000)))
      )
      .subscribe();
  }

  checkBookingAPIHealth() {
    this.authService
      .healthCheck(this.bookingAPIUrl)
      .pipe(
        tap(
          (data) => {
            console.log('Check BookingAPI Health :->' + data);
          },
          (error) => {
            console.log('Check BookingAPI Health :->' + error.statusText);
          }
        ),
        retryWhen((errors) => errors.pipe(delay(300000)))
      )
      .subscribe();
  }

  checkRoute() {
    // tslint:disable-next-line: max-line-length
    return this.router.url.includes('/user/') ||
      this.router.url.includes('/travel-agent/') ||
      this.router.url.includes('/business-user/')
      ? false
      : true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.footerComponent) {
        this.footerComponent = import('./footer/footer.component').then(({ FooterComponent }) => FooterComponent);
      }
    }, 1000);
  }
}


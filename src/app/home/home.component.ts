import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import * as _ from 'lodash';

import { TripType } from '../models/enums.model';
import { HomeService } from './shared/home.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toastr-service';
import { BlogsService } from '../services/blogs.service ';
import { OffersService } from '../services/offers.service';
import { VisaService } from '../services/visa.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Filters
  tripType: TripType;
  tripTypeEnum = TripType;
  responsiveOptions;

  title = 'Cheap Flight Booking|HotelBooking|Umrah|Vacation Packages – Mehman';

  blogsList: any[] = [];
  offersList: any[] = [];
  filteredOptions: any;
  myControl: any;
  service: any;
  selectedTabName: any;
  selectedCountry: any;
  countries: any[];
  filteredCountries: any[];

  // Private
  // private unsubscribeAll: Subject<any>;

  /*
   * Constructor
   *
   */
  constructor(
    private homeService: HomeService,
    private router: Router,
    private toasterService: ToasterService,
    private blogsService: BlogsService,
    private offersService: OffersService,
    private visaService: VisaService,
    private titleService: Title,
    private metaService: Meta
  ) {
    // Set the private defaults
    // this.unsubscribeAll = new Subject();
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    // this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Book Super Cheap Flights, Hotels, Umrah and Holidays Packages online. Mehman.pk is an online travel agency featuring hundreds of deals online. Book Now',
      },
    ]);
    window.scrollTo(0, 0);
    this.tripType = TripType.RoundTrip;

   
    this.selectedTabName = 'flights';
    // this.singleDatePicker(true);

    this.getBlogsForHome();
    this.getOffersForHome();
 
    // on keyup, start the countdown
    const me = this;
    // $('#txtFrom').keyup(function () {
    //   clearTimeout(me.typingTimer);
    //   this.typingTimer = setTimeout(() => { me.searchDeparture(); }, me.doneTypingInterval);
    // });
    // $('#txtTo').keyup(function () {
    //   clearTimeout(me.typingTimer);
    //   this.typingTimer = setTimeout(() => { me.searchArrival(); }, me.doneTypingInterval);
    // });
    $(document).ready(function () {
      $('[data-toggle="popover"]').popover({ html: true });

      $('html').click(function (event) {
        if (!$(event.target).is('#liArrival')) {
          $('#liArrival').popover('hide');
        }
      });
    });
  }

  filterCountry(event) {
    const filtered: any[] = [];
    const query = event.query;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }



  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    // this.unsubscribeAll.next(0);
    // this.unsubscribeAll.complete();
  }

  getFilters() {
    const filters = localStorage.getItem('filters');
    return filters ? true : false;
  }

  getBlogsForHome() {
    this.blogsService
      .getBlogsByCategory(this.selectedTabName)
      .subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            if (response.data) {
              this.blogsList = [];
              this.blogsList = response.data;
            }
          } else {
            if (response.message) {
              this.toasterService.showError(response.message, 'Error');
            }
          }
        }
      });
  }

  selectedTab(tab: any) {
    this.router.navigateByUrl(tab);
    this.selectedTabName = tab == 'visas' ? 'visa' : tab;
    this.getBlogsForHome();
    this.getOffersForHome();
  }

  getOffersForHome() {
    this.offersService
      .getOffersByCategory(this.selectedTabName)
      .subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            if (response.data) {
              this.offersList = [];
              this.offersList = response.data;
            }
          } else {
            if (response.message) {
              this.toasterService.showError(response.message, 'Error');
            }
          }
        }
      });
  }

  openBlogDetail(blog: any) {
    if (blog) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`/blog-detail/${blog.title.split(' ').join('-')}/${blog.id}`])
      );
      window.open(url, '_blank');
    }
  }

  openOfferDetail(offer: any) {
    if (offer) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/offer-detail/' + offer])
      );
      window.open(url, '_blank');
    }
  }

  offerByAirline(airline: any) {
    if (airline) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/offers-airline/' + airline])
      );
      window.open(url, '_blank');
    }
  }

  staticPagesByTopAirlines(airline: any) {
    if (airline) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/flights/' + airline])
      );
      window.open(url, '_blank');
    }
  }

  getVisaByCountry() {

    const url = this.router.serializeUrl(
      this.router.createUrlTree([
        '/visas/' + this.selectedCountry.name,
      ])
    );
    window.open(url, '_blank');
  }

  getImage(photo: any) {
    return 'data:image/png;base64,' + photo;
  }
}

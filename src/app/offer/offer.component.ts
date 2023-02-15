import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { OffersService } from '../services/offers.service';
import { ToasterService } from '../services/toastr-service';
import { of, forkJoin } from 'rxjs';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  p = 0;

  offers: any[] = [
    {
      id: 1,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image1.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 2,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image2.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 3,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image3.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 4,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image4.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 5,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image5.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 6,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image6.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 7,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image7.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 8,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image8.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 9,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image9.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 10,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image10.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 11,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image11.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 12,
      text: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image12.png',
      date: 'Book by Mar 27, 20',
    },
  ];

  offersList: any[] = [];
  airlineByOffers;
  mostViewedofferssList: any[] = [];

  mostViewedOffers: any[] = [
    {
      id: 13,
      text: 'How to Train Your Kids for Travel So You Can Travel More',
      image: 'assets/images/blog/image13.jpg',
      date: 'Mar 27, 20',
    },
    {
      id: 14,
      text: 'How to Train Your Kids for Travel So You Can Travel More',
      image: 'assets/images/blog/image14.jpg',
      date: 'Mar 27, 20',
    },
    {
      id: 15,
      text: 'How to Train Your Kids for Travel So You Can Travel More',
      image: 'assets/images/blog/image15.jpg',
      date: 'Mar 27, 20',
    },
    {
      id: 16,
      text: 'How to Train Your Kids for Travel So You Can Travel More',
      image: 'assets/images/blog/image16.jpg',
      date: 'Mar 27, 20',
    },
  ];

  categories: any[] = [
    { id: 'Flights', name: 'Flights' },
    { id: 'Hotel', name: 'Hotel' },
    { id: 'Holidays', name: 'Holidays' },
    { id: 'Visa', name: 'Visa' },
  ];

  responsiveOptions;

  constructor(
    private offersService: OffersService,
    private router: Router,
    private toasterService: ToasterService,
    private primengConfig: PrimeNGConfig
  ) {
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

  ngOnInit() {
    window.scrollTo(0, 0);
    this.primengConfig.ripple = true;
    this.getOffers();
  }

  getOffers() {
    this.offersService.getOffersForHome().subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.offersList = [];
            this.offersList = response.data;
            this.generateOffersByAirline();
          }
        } else {
          if (response.message) {
            this.toasterService.showError(response.message, 'Error');
          }
        }
      }
    });
  }

  generateOffersByAirline() {
    const source = from(this.offersList);
    const groupByAirlineOffer = source
      .pipe(
        groupBy(
          (catatory) => catatory.subCategory,
          (p) => p
        ),
        mergeMap((group) =>
          forkJoin({
            key: of(group.key),
            offersData: group.pipe(toArray()),
          })
        )
      )
      .pipe(toArray());

    const subscribe = groupByAirlineOffer.subscribe((val) => {
      this.airlineByOffers = JSON.parse(JSON.stringify(val));
    });
  }

  getOffersByCategory(categoryId: any) {
    // if (categoryId > 0) {
    this.offersService.getOffersByCategory(categoryId).subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.offersList = [];
            this.offersList = response.data;
            this.generateOffersByAirline();
          }
        } else {
          if (response.message) {
            this.toasterService.showError(response.message, 'Error');
          }
        }
      }
    });
  }

  openOfferDetail(offer: any) {
    if (offer) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/offer-detail/' + offer])
      );
      window.open(url, '_blank');
    }
  }
  getImage(photo: any) {
    return 'data:image/png;base64,' + photo;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { forkJoin, from, groupBy, mergeMap, of, toArray } from 'rxjs';
import { OffersService } from 'src/app/services/offers.service';
import { ToasterService } from 'src/app/services/toastr-service';

@Component({
  selector: 'app-offer-by-airline',
  templateUrl: './offer-by-airline.component.html',
  styleUrls: ['./offer-by-airline.component.scss'],
})
export class OfferByAirlineComponent implements OnInit {
  categories: any[] = [{ id: 'Flights', name: 'Flights' }];
  responsiveOptions;
  subcategory: any;
  category: any;
  offersList: any[] = [];
  airlineByOffers: any;

  constructor(
    private offersService: OffersService,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig
  ) {
    this.category = 'Flights';
    this.subcategory = this.route.snapshot.params.airline;
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
    this.getOffersByAirline();
  }

  getOffersByAirline() {
    // if (categoryId > 0) {
    this.offersService
      .getOffersBySubCategory(this.category, this.subcategory)
      .subscribe((response) => {
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

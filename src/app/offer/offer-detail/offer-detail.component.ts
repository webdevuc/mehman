import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from 'src/app/services/offers.service';
import { ToasterService } from 'src/app/services/toastr-service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss'],
})
export class OfferDetailComponent implements OnInit {
  offer: any = {};
  offerId: any;
  offersList: any[] = [];
  constructor(
    private offersService: OffersService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router
  ) {
    this.offerId = this.route.snapshot.params.offerId;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getOffers();
    this.getOfferDetail(this.offerId);
  }

  getOfferDetail(id: any) {
    this.offersService.getOffer(id).subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            console.log('Detail', response.data);
            this.offer = response.data;
          }
        } else {
          if (response.message) {
            this.toasterService.showError(response.message, 'Error');
          }
        }
      }
    });
  }

  getOffers() {
    this.offersService.getOffers().subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.offersList = [];
            console.log(response.data);
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

  nextoffer(isNextBlog: boolean) {
    const blogIndex = this.offersList.findIndex((x) => x.id == this.offerId);
    if (isNextBlog) {
      const blog = this.offersList[blogIndex - 1];
      if (blog) {
        this.offerId = blog?.id;
      }
    } else {
      const blog = this.offersList[blogIndex + 1];
      if (blog) {
        this.offerId = blog?.id;
      }
    }
    this.router.navigate([`/offer-detail/${this.offerId}`]);
    this.getOfferDetail(this.offerId);
    window.scrollTo(0, 0);
  }

  getImage(photo: any) {
    return 'data:image/png;base64,' + photo;
  }
}

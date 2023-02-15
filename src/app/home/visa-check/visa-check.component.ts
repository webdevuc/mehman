import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/models/const';
import { CommonService } from 'src/app/services/common.service';
import { FaqService } from 'src/app/services/faq.service';
import { MetaService } from 'src/app/services/meta.service';
import { VisaService } from 'src/app/services/visa.service';
import { FaqItem } from 'src/app/shared/mat-faq/module/faq.item';
import { VisaInquiryService } from '../../services/visa-inquiry.service';

@Component({
  selector: 'app-visa-check',
  templateUrl: './visa-check.component.html',
  styleUrls: ['./visa-check.component.scss'],
  providers: [MetaService]
})
export class VisaCheckComponent implements OnInit {
  selectedCountry: any = '';
  country: any = '';
  phone: string;
  countries: any[];
  visaDeailsByCountry: any[];
  displayDialogBox: boolean;
  displayConfirmDialogBox: boolean;
  contactUsForm: FormGroup;
  submitted: boolean;
  isError: boolean;
  errMsg: string;
  faqs: FaqItem[] = [];
  countryTags: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private visaService: VisaService,
    private visaInquiryService: VisaInquiryService,
    private formBuilder: FormBuilder,
    private faqService: FaqService,
    private commonService: CommonService,
    private meta: MetaService
  ) {
    this.phone = Constant.phone;
    this.country = this.route.snapshot.params.country.replaceAll('-', ' ');
    this.displayDialogBox = false;
    this.displayConfirmDialogBox = false;
    this.isError = false;
  }

  ngOnInit(): void {
    this.getCountries();
    this.getVisaDetailsByCountries(this.country);
    if (this.country) {
      this.getCountryTags(this.country);
    }
    this.getFaqByCountries(this.country);
    this.contactUsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      noOfPerson: ['', [Validators.required]],
      country: [''],
    });
  }

  getCountries() {
    this.visaService.getVisaCountry().subscribe((response) => {
      this.countries = response.data;
    });
  }

  getVisaDetailsByCountries(country: any) {
    if (country !== undefined) {
      this.visaService
        .getVisaDetailsByCountry(country)
        .subscribe((response) => {
          this.visaDeailsByCountry = response.data;
        });
    }
  }

  getFaqByCountries(country: any) {
    if (country !== undefined) {
      this.faqs = [];
      this.faqService.getFaqByCountry(country).subscribe((response) => {
        if (response.data !== undefined && response.data !== null) {
          for (let i = 0; i <= response.data.length - 1; i++) {
            this.faqs.push({
              question: response.data[i].faqName,
              answer: response.data[i].faqValue,
            });
          }
        }
      });
    }
  }

  getVisaByCountry() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/visas/' + this.selectedCountry.name.replaceAll(' ', '-')])
    );
    window.open(url, '_blank');
  }

  applyVisa() {
    this.displayDialogBox = true;
  }

  closePopup() {
    this.displayConfirmDialogBox = false;
  }

  submit() {
    this.submitted = true;
    this.contactUsForm.get('country').setValue(this.country);
    if (this.contactUsForm.invalid) {
      return;
    }

    this.visaInquiryService
      .createVisaInquiry(this.contactUsForm.value)
      .subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            this.displayDialogBox = false;
            this.contactUsForm.reset();
            this.displayConfirmDialogBox = true;
          } else {
            if (
              response.message &&
              response.message != null &&
              response.message !== ''
            ) {
              this.isError = true;
              this.errMsg = response.message;
            }
          }
        }
      });
  }

  getCountryTags(countryName: string) {
    this.commonService.getCountryTags(countryName).subscribe(response => {
      if (response) {
        this.meta.updateTitle(response.data.title);
        response.data.tags.forEach(tag => {
          this.meta.updateMetaInfo(tag);
        })
      }
    });
  }
}
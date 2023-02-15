import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { VisaService } from 'src/app/services/visa.service';
import { HomeService } from '../../shared/home.service';

@Component({
  selector: 'app-visa-tab',
  templateUrl: './visa-tab.component.html',
  styleUrls: ['./visa-tab.component.scss']
})
export class VisaTabComponent implements OnInit {
  blogsList: any[] = [];
  offersList: any[] = [];
  filteredOptions: any;
  myControl: any;
  service: any;
  selectedTabName: any;
  selectedCountry: any;
  countries: any[];
  filteredCountries: any[];

  constructor(private router: Router,
    private visaService: VisaService) {
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getVisaByCountry() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([
        '/visas/' + this.selectedCountry.name.replaceAll(' ', '-'),
      ])
    );

    window.open(url, '_blank');
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

  getCountries() {
    this.visaService.getVisaCountry().subscribe((response) => {
      this.countries = response.data;
    });
  }
}
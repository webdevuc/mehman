import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from './traveller-details';

@Injectable({
  providedIn: 'root',
})
export class TravellerDetailsService {
  constructor(private http: HttpClient) {}

  getCountryCodes() {
    return this.http
      .get<any>('assets/data/countrycodes.json')
      .toPromise()
      .then((res) => res.data as Country[])
      .then((data) => {
        return data;
      });
  }
}

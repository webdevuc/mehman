import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export let browserRefresh = false;
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnDestroy {
  searchfilters: string;
  subscription: Subscription;
  constructor(private router: Router) {
    // tslint:disable-next-line: no-unused-expression
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
    if (!browserRefresh) {
      localStorage.setItem(
        'search-filters',
        JSON.stringify(this.router.getCurrentNavigation().extras.state)
      );
    }

    this.searchfilters = JSON.stringify(
      this.router.getCurrentNavigation().extras.state
    );
  }
  ngAfterViewInit(): void {
    if (browserRefresh) {
      this.searchfilters = JSON.stringify(
        localStorage.getItem('search-filters'));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { CommonService } from './../../../services/common.service';
import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { FooterComponent } from 'src/app/footer/footer.component';
import { Subscription, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-travel-agent-inner-layout',
  templateUrl: './travel-agent-inner-layout.component.html',
  styleUrls: ['./travel-agent-inner-layout.component.scss'],
})
export class TravelAgentInnerLayoutComponent implements OnInit, OnDestroy {
  isBack: boolean;
  bookings: any[];
  pageTitle: string;
  timerSubscription: Subscription; 
  footerComponent: Promise<Type<FooterComponent>>;
  menus: Array<any> = [];
  constructor(
    private authservice: AuthService,
    private commonService: CommonService) { 
      
    }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.setTitle(localStorage.getItem('pageTitle') || 'Search');
    this.menus = this.getMenus();
    let param = {
      fromDate: null,
      toDate: null,
      userId: this.agentUserId
    }
    this.timerSubscription  = timer(0, 60000).pipe(
      switchMap(async () => this.commonService.UpdateAgentBalance(param))
    ).subscribe();    
  }

  setTitle(value) {
    debugger
    let title: string;
    if(value == 'undefined' || value == 'Search')
    {
    title = value;
    }
    if (typeof (value) == 'object') {
      title = value.name
      if (value.key == 'log-out') {
        this.logout();
      }
     document.getElementById('sidenav').classList.remove('show');
    }
    if (value.key != 'log-out' || value.key != 'comission-structure') {
      this.pageTitle = title;
      window.localStorage.setItem('pageTitle', title);
    }

  }

  get userName(): string {
    return this.authservice.getUserEmail();
  }
  get userBalance(): string {
    return this.authservice.getBalance();
  }
  get userOpningBalance(): string {
    return this.authservice.getOpningBalance();
  }
  get userAgentId(): string {
    return this.authservice.getAgentId();
  }
  get agentUserId(): string {
    return this.authservice.getAgentUserId();
  }
  get userCreditLimit(): string {
    return this.authservice.getCreditLimit();
  }

  logout() {
    this.authservice.setTravelAgentLoggedOut();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.footerComponent) {
        this.footerComponent = import('src/app/footer/footer.component').then(({ FooterComponent }) => FooterComponent);
      }
    }, 1000);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    window.localStorage.removeItem('pageTitle');
    this.timerSubscription.unsubscribe();
  }

  getMenus() {
    return [
      { key: 'search', name: 'Search', url: '/travel-agent/search' },
      { key: 'bookings', name: 'Bookings', url: '/travel-agent/bookings' },      
      { key: 'view-requests', name: 'Apply Refund', url: '/travel-agent/view-requests' },
      // { key: 'view-voids', name: 'Apply Void', url: '/travel-agent/view-voids' },
      { key: 'import-prn', name: 'Import PNR', url: '/travel-agent/import-prn' },
      { key: 'comission-structure', name: 'Comission Structure', url: 'https://1drv.ms/x/s!AgS8lY1PwbULjNs8g9LaSRzW9XEwNg?e=Q8BcJw' },
      { key: 'visas', name: 'Visas', url: '/visas' },
      { key: 'view-ledger', name: 'View Ledger', url: '/travel-agent/view-ledger' },
      { key: 'add-payment', name: 'Add Payment', url: '/travel-agent/add-payment' },
      { key: 'contact-us', name: 'Contact Us', url: '/travel-agent/contact-us' },
      { key: 'log-out', name: 'Log out', url: '/travel-agent/auth/signin' },
    ]
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-travel-agent-detail-inner-layout',
  templateUrl: './travel-agent-detail-inner-layout.component.html',
  styleUrls: ['./travel-agent-detail-inner-layout.component.scss'],
})
export class TravelAgentDetailInnerLayoutComponent implements OnInit {
  isBack: boolean;
  bookings: any[];
  pageTitle: string;

  constructor(private authService: AuthService, private router: Router) {
    
    console.log('this.router.url', this.router.url);
    if (this.router.url.includes('/travel-agent/booking-detail')) {
      this.isBack = true;
    } else {
      this.isBack = false;
    }
    this.setTitle(localStorage.getItem('pageTitle') || 'Search')
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    //this.isShow= true
  }

  setTitle(title) {
    this.pageTitle = title;
    document.getElementById('sidenav').classList.remove('show');
  }

  get userName(): string {
    return this.authService.getUserEmail();
  }

  get userBalance(): string {
    return this.authService.getBalance();
  }
  get userCreditLimit(): string {
    return this.authService.getCreditLimit();
  }
  get userAgentId(): string {
    return this.authService.getAgentId();
  }
  logout() {
    this.authService.setTravelAgentLoggedOut();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-travel-agent-inner-header',
  templateUrl: './travel-agent-inner-header.component.html',
  styleUrls: ['./travel-agent-inner-header.component.scss'],
})
export class TravelAgentInnerHeaderComponent implements OnInit {
  show:boolean;
  get isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  get userName(): string {
    return this.authService.getName();
  }

  get isHome(): boolean {
    return this.checkRoute();
  }

  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {}

  logout() {
    this.authService.setTravelAgentLoggedOut();
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';

  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  checkRoute() {
    return this.router.url === '/' ? false : true;
  }
}

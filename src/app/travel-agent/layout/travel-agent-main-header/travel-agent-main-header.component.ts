import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-travel-agent-main-header',
  templateUrl: './travel-agent-main-header.component.html',
  styleUrls: ['./travel-agent-main-header.component.scss'],
})
export class TravelAgentMainHeaderComponent implements OnInit {
 
  get isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  get userName(): string {
    return this.authService.getName();
  }

  get isHome(): boolean {
    return this.checkRoute();
  }

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void { }

  logout() {
    this.authService.loggedOut();
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

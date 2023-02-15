import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessUserGuardService implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.authService.isUserLoggedIn();
    const role = this.authService.getRole();
    if (!isLoggedIn || role == null || role === undefined || role === '') {
      this.authService.setBusinessUserLoggedOut();
    } else {
      if (role === 'BusinessUser') {
        return isLoggedIn;
      } else {
        this.authService.setBusinessUserLoggedOut();
      }
    }
  }
}

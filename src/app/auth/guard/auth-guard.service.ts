import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private _authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this._authService.isUserLoggedIn();
    const role = this._authService.getRole();
    if (!isLoggedIn || (role == null || role === undefined || role === '')) {
      this._authService.setUserLoggedOut();
    }
    else {
      if (role === 'User') {
        return isLoggedIn;
      } else {
        this._authService.setUserLoggedOut();
      }
    }
  }
}

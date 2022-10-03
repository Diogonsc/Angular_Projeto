import { RequestLogin } from './../login/model/RequestLogin';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/view/login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveRouterGuard implements CanActivate {
  constructor(public router: Router, public authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
      return true
  }
}

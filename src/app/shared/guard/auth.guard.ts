import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {map, Observable, of, skip, switchMap, take} from 'rxjs';
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.user){
      return !!this.auth.user;
    }else {
      return this.auth.checkLogin().pipe(
        switchMap(res => {
          if (res.success) {
            this.auth.user = res.data;
            this.auth.user$.next(res.data);
            return of(true); // Emit true to allow navigation
          } else {
            this.router.navigate(['login']); // Navigate to login page
            return of(false); // Emit false to prevent navigation
          }
        })
      );
    }


  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    !this.auth.user && this.router.navigate(['login']).catch();
    return !!this.auth.user;
  }
}

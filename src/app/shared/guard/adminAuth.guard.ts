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
export class AdminAuthGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("AdminAuthGuard",this.auth.admin)
    if (this.auth.admin){
      return !!this.auth.admin;
    }else {
      return this.auth.adminCheckLogin("admin").pipe(
        switchMap(res => {
          console.log("authGuard: checkLogin response: ", res);
          if (res.success&&(res.data.role.type==='Admin'||res.data.role.type==='Manager')) {
            this.auth.admin = res.data;
            this.auth.admin$.next(res.data);
            return of(true); // Emit true to allow navigation
          } else {
            this.router.navigate(['/admin/login']).catch(); // Navigate to login page
            return of(false); // Emit false to prevent navigation
          }
        })
      );
    }


  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    !this.auth.admin && this.router.navigate(['login']).catch();
    return !!this.auth.admin;
  }
}

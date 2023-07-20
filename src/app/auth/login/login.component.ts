import {ChangeDetectorRef, Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../shared/service/auth.service";
import {UserInfoService} from "../../shared/service/user-info.service";
import {filter, of, switchMap, throwError} from "rxjs";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authBack=false;
  constructor(private auth:AuthService,
              private userInfoService: UserInfoService,
              private router: Router,
              private location:Location,
              private cdr:ChangeDetectorRef) {

  }
  errorMessage: string = "";

  login({value}: NgForm) {
    console.log("user:", value);
    this.auth.login(value).subscribe(res => {
      console.log("login response: ", res);
      if (res.success) {
        this.auth.user = res.user;
        localStorage.setItem("customerToken", res.token); // store token in local storage
        this.userInfoService.getUserInfo(this.auth.user.id);

        this.router.navigate(["/products"]).catch();

      } else {
        // If login is not successful, an empty observable is returned
        this.errorMessage = res.message;
        this.cdr.detectChanges();
        console.log(res);
      }
    });
  }
}

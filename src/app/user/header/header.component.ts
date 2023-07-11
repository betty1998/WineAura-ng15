import { Component } from '@angular/core';
import {AuthService} from "../../shared/service/auth.service";
import {ProductService} from "../../shared/service/product.service";
import {Router} from "@angular/router";
import {UserInfoService} from "../../shared/service/user-info.service";
import {UserInfo} from "../../shared/model/UserInfo";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = "Wine Aura";
  searchText: string = "";

  constructor(public auth: AuthService,
              public infoService:UserInfoService,
              private prodService:ProductService,
              private router:Router) {
    if (auth.user&&!infoService.userInfo){
      infoService.getUserInfo(auth.user?.id).subscribe(res => {
        if (res.success) {
          infoService.userInfo = res.data;
        } else {
          console.log(res);
        }
      });
    }
  }


  search(event: KeyboardEvent) {
    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText);
    this.prodService.search.next(this.searchText);
  }

  logout() {
    this.auth.logout();
    // Get current URL.
    let currentUrl = this.router.url;

    // Navigate away and then back to trigger route guards.
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getCartAmount(userInfo: UserInfo | undefined) {
    return userInfo?.cart.reduce((acc, cur) => acc + cur.qty, 0);
  }
}

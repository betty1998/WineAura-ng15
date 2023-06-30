import { Component } from '@angular/core';
import {AuthService} from "../../shared/service/auth.service";
import {ProductService} from "../../shared/service/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = "Wine Aura";
  searchText: string = "";

  constructor(public auth: AuthService,
              private prodService:ProductService) {
  }


  search(event: KeyboardEvent) {
    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText);
    this.prodService.search.next(this.searchText);
  }
}

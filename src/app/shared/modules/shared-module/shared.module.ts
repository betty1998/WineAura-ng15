import { NgModule } from '@angular/core';
import {ProductReviewComponent} from "../../../user/product/product-detail/product-review/product-review.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {StatusDirective} from "../../directive/status.directive";



@NgModule({
  declarations: [
    ProductReviewComponent,
    StatusDirective
  ],
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    NgForOf

  ],
  exports: [
    ProductReviewComponent,
    StatusDirective
  ]
})
export class SharedModule { }

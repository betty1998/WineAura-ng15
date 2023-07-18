import { NgModule } from '@angular/core';
import {ProductReviewComponent} from "../../../user/product/product-detail/product-review/product-review.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    ProductReviewComponent
  ],
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule

  ],
  exports: [
    ProductReviewComponent
  ]
})
export class SharedModule { }

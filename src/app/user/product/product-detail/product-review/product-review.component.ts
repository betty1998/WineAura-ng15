import {Component, Input} from "@angular/core";
import {Product} from "../../../../shared/model/Product";
import {Review} from "../../../../shared/model/Review";
import {MatDialog} from "@angular/material/dialog";
import {ProductService} from "../../../../shared/service/product.service";
import {ConfirmDialogComponent} from "../../../../shared/dialog/confirm-dialog.component";

@Component(
  {
    selector: 'app-product-review',
    template: `
      <div class="product-review ms-1 me-1">
        <h2 class="pt-3">REVIEWS</h2>
        <mat-divider></mat-divider>
        <div *ngFor="let review of product?.reviews;let i=index">
          <mat-divider *ngIf="i>0"></mat-divider>
          <div class="review-row row align-items-start pt-2">
            <div class="col-2">
              <h4 class="text-capitalize">{{review.nickname}}</h4>
              <p>{{review.reviewDate}}</p>
              <!--TODO
                 can add location or profile image here
              -->
            </div>
            <div class="col-8">
              <div class="stars">
                <mat-icon color="accent"
                          *ngFor="let star of stars">{{star <= review.rating ? 'star' : 'star_border'}}</mat-icon>
                <mat-icon color="accent" *ngIf="review.rating % 1 > 0 && review.rating === Math.floor(review.rating)">
                  star_half
                </mat-icon>
                <div class="review-title">{{review.title}}</div>
                <div class="mt-2">{{review.comment}}</div>
              </div>
              <div *ngIf="!deletable" class="helpful d-flex justify-content-end align-items-center">
                <span>Helpful?</span>
                <button mat-icon-button (click)="thumbUp(review.id)">
                  <mat-icon>thumb_up</mat-icon>
                </button>
                <button mat-icon-button (click)="thumbDown(review.id)">
                  <mat-icon>thumb_down</mat-icon>
                </button>
              </div>
            </div>
            <div class="col-2" *ngIf="deletable">
              <button (click)="deleteReview(product?.id,review)" mat-icon-button color="primary" class="mt-3">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>

        </div>

      </div>
    `
  }
)
export class ProductReviewComponent{
  @Input()
  product: Product | null | undefined;
  @Input()
  deletable: boolean = false;

  constructor(private productService: ProductService,
              private dialog: MatDialog) {
  }

  stars = [1, 2, 3, 4, 5];
  Math = Math;

  thumbUp(id: number | undefined) {

  }

  thumbDown(id: number | undefined) {

  }

  deleteReview(id: number | undefined, review: Review) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Delete Review",
        message: "Are you sure you want to delete this review?"
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.productService.deleteReview(id, review).subscribe(res => {
          if (res.success) {
            this.product = res.data;
          } else {
            console.log(res);
          }
        });
      }
    });
  }
}

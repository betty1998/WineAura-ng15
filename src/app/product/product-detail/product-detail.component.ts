import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/model/Product";
import {ProductService} from "../../shared/service/product.service";
import {ActivatedRoute, Routes} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  product!: Product;
  id: number | null | undefined;
  qty: number | undefined;
  stars = [1, 2, 3, 4, 5];
  Math = Math;
  constructor(private productService: ProductService,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap(params=>{
        this.id = Number(params.get("id"));
        return this.productService.getProduct(this.id);
      }))
      .subscribe(res =>{
        if (res.success){
          console.log(res.data);
          this.product = res.data;
        }else{
          console.log(res);
        }
      })
  }


  addToCart(product: Product) {

  }


  thumbUp(id: number | undefined) {

  }

  thumbDown(id: number | undefined) {

  }


}

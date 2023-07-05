import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/service/product.service";
import {Product} from "../../../shared/model/Product";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit{
  id!: number;
  product!:Product;
  productForm!:FormGroup;

  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              private router:Router,
              private fb:FormBuilder) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.id = id;
      this.productService.getProduct(id).subscribe(res=>{
        if (res.success) {
          this.product = res.data;
          console.log(res.data);
        } else {
          console.log(res);
          alert(res.message);
        }
      });
    }
    this.createGroup();
  }
  createGroup() {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      taste: [''],
      style: [''],
      ABV: [''],
      capacity: [''],
      brand: [''],
      category: [''],
      price: [''],
      stock: [''],
      image: ['']
    });
  }

}

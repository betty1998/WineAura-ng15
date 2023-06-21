import {Component, OnInit} from '@angular/core';
import {Product} from "../shared/model/Product";
import {ProductService} from "../shared/service/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  min: number|undefined;
  max: number|undefined;
  products!: Product[];
  categories!: string[];
  regions!: string[];
  brands!: string[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res=>{
      if (res.success){
        this.products = res.data;
        this.productService.products = res.data;
        this.categories = this.productService.getCategories();
        this.regions = this.productService.getRegions();
        this.brands = this.productService.getBrands();
      }else{
        alert(res.message);
      }
      })

  }
}

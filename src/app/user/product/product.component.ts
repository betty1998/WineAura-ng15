import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Product} from "../../shared/model/Product";
import {ProductService} from "../../shared/service/product.service";
import {SearchPipe} from "../../shared/pipe/search.pipe";
import {BehaviorSubject, filter} from "rxjs";
import {Filter} from "../../shared/model/Filter";
import {FilterService} from "../../shared/service/filter.service";
import {ProductOverviewComponent} from "./product-overview/product-overview.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit,AfterViewInit{
  min: number|undefined;
  max: number|undefined;
  products!: Product[];
  rawProducts!: Product[];
  categories!: string[];
  regions!: string[];
  brands!: string[];
  searchKey: string = "";
  @ViewChildren('price')
  priceCheckboxes!: QueryList<ElementRef>;
  priceRange = ["Up to $20", "$20 to $40", "$40 to $60", "$60 and Above"];
  page: number = 1;
  itemPerPage:string = "12";
  @ViewChildren(ProductOverviewComponent)
  pipedProducts!: QueryList<ProductOverviewComponent>;
  total!: number;

  constructor(public productService: ProductService,
              private searchPipe:SearchPipe,
              public filterService:FilterService,
              private cdr:ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res=>{
      if (res.success){
        this.products = res.data;
        this.rawProducts = res.data;
        this.productService.products = res.data;
        this.categories = this.productService.getCategories(this.products);
        this.regions = this.productService.getRegions(this.products);
        this.brands = this.productService.getBrands(this.products);
      }else{
        alert(res.message);
      }
      })
    this.productService.search.subscribe(res=>{
      this.searchKey = res;
      const searched = this.searchPipe.transform(this.products, this.searchKey);
      this.categories = this.productService.getCategories(searched);
      this.regions = this.productService.getRegions(searched);
      this.brands = this.productService.getBrands(searched);
    });

  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }


  filterPrice(value1: string, value2: string) {
    this.min = value1 ? Number(value1): Number.MIN_VALUE;
    this.max = value2 ? Number(value2): Number.MAX_VALUE;
    this.priceCheckboxes.forEach((checkbox) => {
      checkbox.nativeElement.checked = false;
    });
  }

  toggleFilter(event:Event,filter:Filter) {
    if ((event.target as HTMLInputElement).checked) {
      // If checkbox is checked, add the filter
      this.filterService.addFilter(filter);
    } else {
      // If checkbox is unchecked, remove the filter
      this.filterService.removeFilter(filter);
    }
  }

  clearInput(input1: HTMLInputElement, input2: HTMLInputElement) {
    input1.value = '';
    input2.value = '';
    this.min = undefined;
    this.max = undefined;
  }

  sort(selected: string) {
    if (selected == "default"){
      this.products = [...this.rawProducts];
    }else if (selected == "price1") {
      const tmp = this.products.sort(
        (a, b) => a.price - b.price);
      this.products = [...tmp];
    }else if (selected == "price2") {
      const tmp = this.products.sort(
        (a, b) => b.price - a.price);
      this.products = [...tmp];
    }
  }


}


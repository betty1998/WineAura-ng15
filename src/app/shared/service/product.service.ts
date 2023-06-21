import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";
import {DataResponse} from "../httpResponse/dataResponse";
import {Product} from "../model/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[]|undefined;

  constructor(private httpClient:HttpClient) { }


  getProducts():Observable<DataResponse<Product[]>>{
    return this.httpClient.get<DataResponse<Product[]>>(`${environment.api}/products`);
  }

  getProduct(id: number): Observable<DataResponse<Product>>{
    return this.httpClient.get<DataResponse<Product>>(`${environment.api}/products/${id}`);
  }

  getCategories(): string[]{
    let categories = this.products?.map(product => product.category);
    return Array.from(new Set(categories));
  }

  getBrands() {
    let brands = this.products?.map(product => product.brand);
    return Array.from(new Set(brands));
  }
  getRegions() {
    let regions = this.products?.map(product => product.region);
    return Array.from(new Set(regions));
  }

  checkStock(id: number | undefined):Observable<DataResponse<number>> {
    return this.httpClient.get<DataResponse<number>>(`${environment.api}/products/checkStock/${id}`);

  }
}


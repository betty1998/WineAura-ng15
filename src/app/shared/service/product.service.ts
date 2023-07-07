import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {BehaviorSubject, Observable} from "rxjs";
import {DataResponse} from "../httpResponse/dataResponse";
import {Product} from "../model/Product";
import {B} from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[]|undefined;
  search = new BehaviorSubject<string>("");
  total$ = new BehaviorSubject<number>(0);

  constructor(private httpClient:HttpClient) { }


  getProducts():Observable<DataResponse<Product[]>>{
    return this.httpClient.get<DataResponse<Product[]>>(`${environment.api}/products`);
  }

  getProduct(id: number): Observable<DataResponse<Product>>{
    return this.httpClient.get<DataResponse<Product>>(`${environment.api}/products/${id}`);
  }

  getCategories(products:Product[]): string[]{
    let categories = products?.map(product => product.category);
    return Array.from(new Set(categories));
  }

  getBrands(products:Product[]) {
    let brands = products?.map(product => product.brand);
    return Array.from(new Set(brands));
  }
  getRegions(products:Product[]) {
    let regions = products?.map(product => product.region);
    return Array.from(new Set(regions));
  }

  checkStock(id: number | undefined):Observable<DataResponse<number>> {
    return this.httpClient.get<DataResponse<number>>(`${environment.api}/products/checkStock/${id}`);

  }

  addProduct(product: Product):Observable<DataResponse<Product>> {
    return this.httpClient.post<DataResponse<Product>>(`${environment.api}/products`, product);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete<DataResponse<Product>>(`${environment.api}/products/${id}`);
  }

  updateProduct(product: Product) {
    return this.httpClient.put<DataResponse<Product>>(`${environment.api}/products/updateInfo/${product.id}`, product);
  }
}


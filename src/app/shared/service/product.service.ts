import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {DataResponse} from "../httpResponse/dataResponse";
import {Product} from "../model/Product";
import {B} from "@angular/cdk/keycodes";
import {Review} from "../model/Review";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[]|undefined;
  search = new BehaviorSubject<string>("");
  total$ = new BehaviorSubject<number>(0);

  constructor(private httpClient:HttpClient) { }


  getProducts(module:string="user"):Observable<DataResponse<Product[]>>{
    return this.httpClient.get<DataResponse<Product[]>>(`${environment.api}/products`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  getProduct(id: number,module:string="user"): Observable<DataResponse<Product>>{
    return this.httpClient.get<DataResponse<Product>>(`${environment.api}/products/${id}`,
      { headers: new HttpHeaders({ 'module': module }) });
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

  checkStock(id: number | undefined,module:string="user"):Observable<DataResponse<number>> {
    return this.httpClient.get<DataResponse<number>>(`${environment.api}/products/checkStock/${id}`,
      { headers: new HttpHeaders({ 'module': module }) });

  }

  addProduct(product: Product,module:string="admin"):Observable<DataResponse<Product>> {
    return this.httpClient.post<DataResponse<Product>>(`${environment.api}/products`, product,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  deleteProduct(id: number,module:string="admin") {
    return this.httpClient.delete<DataResponse<Product>>(`${environment.api}/products/${id}`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  updateProduct(product: Product,module:string="user") {
    return this.httpClient.put<DataResponse<Product>>(`${environment.api}/products/updateInfo/${product.id}`, product,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  updateStatus(id: number | undefined, newStatus: String,module:string="user") {
    return this.httpClient.put<DataResponse<Product>>(`${environment.api}/products/updateStatus/${id}`, newStatus,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  addCategory(category: string,module:string="admin") {
    return this.httpClient.post<DataResponse<string>>(`${environment.api}/categories/${category}`, null,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  addBrand(brand: string,module:string="admin") {
    return this.httpClient.post<DataResponse<string>>(`${environment.api}/brands/${brand}`, null,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  addRegion(region: string,module:string="admin") {
    return this.httpClient.post<DataResponse<string>>(`${environment.api}/regions/${region}`, null,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  deleteReview(id: number | undefined, review:Review,module:string="admin") {
    return this.httpClient.put<DataResponse<Product>>(`${environment.api}/products/deleteReview/${id}`, review,
      { headers: new HttpHeaders({ 'module': module }) });
  }

}


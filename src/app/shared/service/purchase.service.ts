import { Injectable } from '@angular/core';
import {DataResponse} from "../httpResponse/dataResponse";
import {Purchase} from "../model/Purchase";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../model/Product";
import {Observable} from "rxjs";
import {ProductSold} from "../model/ProductSold";
import {Count} from "../model/Count";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  returnReasons = [
    'Incorrect item sent',
    'Item arrived damaged',
    'Not satisfied with the product',
    'Other'
  ];
  constructor(private http:HttpClient) { }


  updatePurchaseStatus(purchaseId: number, status: string, module: string = "user"):Observable<DataResponse<Purchase>> {
    return this.http.put<DataResponse<Purchase>>(`${environment.api}/purchases/updateStatus/${purchaseId}`, status,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  getTopSellings(module: string = "user") {
    return this.http.get<DataResponse<ProductSold[]>>(`${environment.api}/purchases/topSelling`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  getCategoryMap(module: string = "user") {
    return this.http.get<DataResponse<Count>>(`${environment.api}/purchases/categoryMap`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  getPurchases(module: string = "user") {
    return this.http.get<DataResponse<Purchase[]>>(`${environment.api}/purchases`,
      { headers: new HttpHeaders({ 'module': module }) });
  }

  getTotalPurchases(module: string = "user") {
    return this.http.get<DataResponse<number>>(`${environment.api}/purchases/totalPurchases`,
      { headers: new HttpHeaders({ 'module': module }) });
  }
}

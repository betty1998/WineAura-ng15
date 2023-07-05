import { Injectable } from '@angular/core';
import {DataResponse} from "../httpResponse/dataResponse";
import {Purchase} from "../model/Purchase";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
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


  updatePurchaseStatus(purchaseId: number, status: string) {
    return this.http.put<DataResponse<Purchase>>(`${environment.api}/purchases/updateStatus/${purchaseId}`, status);
  }

  getTopSellings() {
    return this.http.get<DataResponse<ProductSold[]>>(`${environment.api}/purchases/topSelling`);
  }

  getCategoryMap() {
    return this.http.get<DataResponse<Count>>(`${environment.api}/purchases/categoryMap`);
  }
}

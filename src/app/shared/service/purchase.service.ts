import { Injectable } from '@angular/core';
import {DataResponse} from "../httpResponse/dataResponse";
import {Purchase} from "../model/Purchase";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";

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
}

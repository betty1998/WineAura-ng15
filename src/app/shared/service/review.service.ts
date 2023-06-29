import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Review} from "../model/Review";
import {environment} from "../../../environments/environment.development";
import {DataResponse} from "../httpResponse/dataResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  addReview(review: Review, productId: number | undefined):Observable<DataResponse<Review>> {
    return this.http.post<DataResponse<Review>>(`${environment.api}/reviews/${productId}`,review);
  }
}

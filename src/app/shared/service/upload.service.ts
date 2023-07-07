import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DataResponse} from "../httpResponse/dataResponse";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  uploadFile(formData: FormData) {
    return this.http.post(`${environment.api}/file`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}



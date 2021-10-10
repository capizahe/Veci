import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Option } from '../model/option';

@Injectable({
  providedIn: 'root'
})
export class ProductOptionService {

  private productOptionServiceURL;

  constructor(private http: HttpClient) {

    this.productOptionServiceURL = environment.productOptionsURL;

  }

  getProductOptions(storeId: string) {

    const URL = this.productOptionServiceURL + '/' + storeId;

    return this.http.get<Option[]>(URL);

  }
}

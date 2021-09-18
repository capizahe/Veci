import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productServiceURL;

  private products: Array<Product>;

  constructor(private httpClient: HttpClient) {
    this.productServiceURL = environment.productServiceURL;
  }


  loadProductsByCategory(id: string) {
    const URL = this.productServiceURL + '/getAllProductsByStore/' + id;
    return this.httpClient.get<Product[]>(URL);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';
import { Store } from '../model/store';
import { StoreCategory } from '../model/store-category';

@Injectable({
  providedIn: 'root'
})
export class StoreServiceService {

  private storeServiceURL;

  private storeCategoryServiceURL;

  private stores: Array<Store>;

  constructor(private httpClient: HttpClient) {
    this.storeServiceURL = environment.storeServiceURL;
    this.storeCategoryServiceURL = environment.storeCategoryServiceURL;

  }

  getAvailableStores() {
    const URL = this.storeServiceURL + '/getAvailable';
    return this.httpClient.get<Store[]>(URL);
  }

  getStoreById(id: string) {
    const URL = this.storeServiceURL + '/' + id;
    return this.httpClient.get<Store>(URL);
  }

  getAllStoreCategories() {
    const URL = this.storeCategoryServiceURL + '/all';
    return this.httpClient.get<StoreCategory[]>(URL);
  }

  getStoreCategoryById(id: string) {
    const URL = this.storeCategoryServiceURL + '/' + id;
    return this.httpClient.get<StoreCategory[]>(URL);
  }

  public get storeList(): Array<Store> {
    return this.stores;
  }

  public set storeList(stores: Array<Store>) {
    this.stores = stores;
  }
}

import { Component } from '@angular/core';
import { Store } from '../model/store';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  availableStores: Array<Store>;

  constructor() {

    this.availableStores = new Array<Store>();

    const store = new Store();

    this.availableStores.push(store);
    this.availableStores.push(store);
    this.availableStores.push(store);
    this.availableStores.push(store);
  }

}

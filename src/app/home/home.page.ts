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

    store.name = 'Panaderia Lucia';
    store.score = 4.2;
    // eslint-disable-next-line max-len
    store.imageUrl = 'https://st3.depositphotos.com/8696740/12549/v/950/depositphotos_125496396-stock-illustration-bakery-badge-and-logo-icon.jpg';
    store.distance = 0.5;
    store.deliveryTime = '10 -15 min';

    this.availableStores.push(store);
    this.availableStores.push(store);
    this.availableStores.push(store);
    this.availableStores.push(store);


  }

}

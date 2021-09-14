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

    store.id = 1;
    store.name = 'Panaderia Lucia';
    store.score = 4.2;
    // eslint-disable-next-line max-len
    store.imageLogo = 'https://vecimarketdevs3.s3.us-east-2.amazonaws.com/1631479629623';
    store.distance = 0.5;
    store.deliveryTime = '10 -15 min';

    this.availableStores.push(store);
    this.availableStores.push(store);
    this.availableStores.push(store);
    this.availableStores.push(store);
  }

}

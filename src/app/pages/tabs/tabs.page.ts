import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {


  constructor(public cartService: CartService) {
  }

}

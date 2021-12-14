import { AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/model/product-cart';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit{

  public products: Array<ProductCart>;

  constructor(private cartService: CartService) { 
  
  }

  async ngOnInit() {

    console.log("CART DATA",this.cartService.getCartData())
    this.products = this.cartService.getCartData();  

  }

}

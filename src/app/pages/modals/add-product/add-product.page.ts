import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { ProductCart } from 'src/app/model/product-cart';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  @Input() product: Product;

  productCart: ProductCart;
  
  productCount = 1;

  constructor(public modalController: ModalController, private cartService: CartService) { }

  ngOnInit() {

    console.log(this.product)

  }

  increaseCounter(){
    this.productCount++;
  }

  decreaseCounter(){
    if(this.productCount > 1){
      this.productCount--;
    }
  }

  addProductToCart(){
    this.cartService.addProductToCart(this.product, this.productCount);
    this.modalController.dismiss();
  }

  dismissProductAdition(){
    this.modalController.dismiss();
  }



}

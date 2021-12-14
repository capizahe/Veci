import { Component, Input, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/model/product-cart';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent implements OnInit {

  @Input() cartProduct: ProductCart;

  constructor() { }

  ngOnInit() {}

}

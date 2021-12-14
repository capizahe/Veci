import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { ProductCart } from '../model/product-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsCart: Array<ProductCart>;
  
  constructor() { 

    this.loadLocalDB();
  }

  addProductToCart(product: Product, quantity: number){
    const productCart = new ProductCart();
    productCart.product = product;
    productCart.quantity = quantity;
    this.saveLocal(productCart)
  }

  removeProduct(product: Product, quantity: number){
    const productCart = new ProductCart();
    productCart.product = product;
    productCart.quantity = quantity;
    this.productsCart.splice(this.productsCart.indexOf(productCart), 0);
  }

  getCartCount(): number{
    return this.productsCart.length;
  }

  getCartData(): Array<ProductCart>{
    return this.getLocalData();
  }

  loadLocalDB(){
    let data = localStorage.getItem("data");
    if(data){
    this.productsCart = JSON.parse(data);
    }else{
      this.productsCart = [];
    }
  }

  getLocalData(){
    let data = localStorage.getItem("data");
    if(data){
    this.productsCart = JSON.parse(data);
    return this.productsCart;
    }else{
      return null;
    }
  }

  saveLocal(productCart: ProductCart){

    let data = localStorage.getItem("data");
    if(data){
    this.productsCart = JSON.parse(data);
    this.productsCart.push(productCart);
    }else{
      this.productsCart = [];
      this.productsCart.push(productCart);
    }

    localStorage.setItem("data",JSON.stringify(this.productsCart))
    


  }
}

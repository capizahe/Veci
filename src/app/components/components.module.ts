import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from './product-card/product-card.component';
import { StoreCardComponent } from './store-card/store-card.component';
import { CartProductComponent } from './cart-product/cart-product.component';

@NgModule({
  declarations: [
    ProductCardComponent, StoreCardComponent, CartProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ProductCardComponent, StoreCardComponent, CartProductComponent]
})
export class ComponentsModule { }

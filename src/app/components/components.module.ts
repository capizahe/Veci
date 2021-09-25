import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from './product-card/product-card.component';
import { StoreCardComponent } from './store-card/store-card.component';



@NgModule({
  declarations: [
    ProductCardComponent, StoreCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ProductCardComponent, StoreCardComponent]
})
export class ComponentsModule { }

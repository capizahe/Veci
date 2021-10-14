import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductAdditionalInfoPageRoutingModule } from './product-additional-info-routing.module';

import { ProductAdditionalInfoPage } from './product-additional-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductAdditionalInfoPageRoutingModule
  ],
  declarations: [ProductAdditionalInfoPage]
})
export class ProductAdditionalInfoPageModule {}

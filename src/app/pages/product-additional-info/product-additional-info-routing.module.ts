import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductAdditionalInfoPage } from './product-additional-info.page';

const routes: Routes = [
  {
    path: '',
    component: ProductAdditionalInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductAdditionalInfoPageRoutingModule {}

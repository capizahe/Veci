import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'store/:id',
    loadChildren: () => import('./pages/store/store.module').then(m => m.StorePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'product-additional-info/:id',
    loadChildren: () => import('./pages/product-additional-info/product-additional-info.module')
      .then(m => m.ProductAdditionalInfoPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./pages/modals/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./pages/modals/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

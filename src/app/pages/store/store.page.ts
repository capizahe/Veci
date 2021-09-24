import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { Store } from 'src/app/model/store';
import { ProductService } from 'src/app/services/product.service';
import { StoreServiceService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  store: Store;
  products: Array<Product>;
  storeIdParam: string;
  defaultName = 'Loading...';

  constructor(private router: ActivatedRoute,
    private productService: ProductService, private alertController: AlertController,
    private storeService: StoreServiceService) {


    this.storeIdParam = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadStoreInfo();
    this.loadProducts();

  }

  loadProducts() {
    this.productService.loadProductByStore(this.storeIdParam)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.products = data;
        },
        complete: () => {
          console.log('Data retrieve success');
        },
        error: (error) => {
          this.showErrorAlert(error);
          console.log(error);
        }
      });
  }

  loadStoreInfo() {
    this.storeService.getStoreById(this.storeIdParam)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.store = data[0];
          this.defaultName = this.store.name;
          console.log(this.store);

        },
        complete: () => {
          console.log('Data retrieve success');
        },
        error: (error) => {
          this.showErrorAlert(error);
          console.log(error);
        }
      });
  }

  async showErrorAlert(error) {
    const alertMessage = await this.alertController.create({
      header: 'Ups... parece que ocurrio un error',
      subHeader: error,
      buttons: ['Salir']
    });
    alertMessage.present();
  }
}

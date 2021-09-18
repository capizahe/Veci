import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  storeId: string;
  products: Array<Product>;

  constructor(private router: ActivatedRoute, private productService: ProductService, private alertController: AlertController) {
    this.storeId = this.router.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.productService.loadProductsByCategory(this.storeId)
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

  async showErrorAlert(error) {
    const alertMessage = await this.alertController.create({
      header: 'Ups... parece que ocurrio un error',
      subHeader: error,
      buttons: ['Salir']
    });
    alertMessage.present();
  }
}

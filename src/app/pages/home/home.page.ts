import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StoreCategory } from 'src/app/model/store-category';
import { StoreServiceService } from 'src/app/services/store-service.service';
import { Store } from '../../model/store';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  stores: Array<Store>;
  category: StoreCategory;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: true
  };

  constructor(private router: Router, private storeService: StoreServiceService, private alertController: AlertController) { }

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.storeService.getAvailableStores()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.stores = data;

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


  loadProductCategory() {
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

import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '../model/store';
import { AlertController } from '@ionic/angular';
import { StoreServiceService } from '../services/store-service.service';
import { StoreCategory } from '../model/store-category';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {

  stores: Array<Store>;
  category: StoreCategory;

  constructor(private router: Router, private storeService: StoreServiceService, private alertController: AlertController) { }

  ngOnInit() {
    this.loadStores();
  }

  openStore(store: Store) {
    console.log('opening store ', store);
    this.router.navigateByUrl(`/store/${store.id}`);
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

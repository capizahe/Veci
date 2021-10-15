import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FilterObject } from 'src/app/model/filter-object';
import { StoreCategory } from 'src/app/model/store-category';
import { LoginService } from 'src/app/services/login.service';
import { StoreServiceService } from 'src/app/services/store-service.service';
import { UserService } from 'src/app/services/user-service.service';
import { Store } from '../../model/store';
import { FilterPage } from '../filter/filter.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  stores: Array<Store>;
  category: StoreCategory;
  name: string;

  slideOpts = {
    initialSlide: 1,
    speed: 600,
    autoplay: true
  };

  constructor(private router: Router, private storeService: StoreServiceService, private alertController: AlertController,
    private loginService: LoginService, private modalController: ModalController) { }

  async ngOnInit() {
    this.loadStores();
    await this.loginService.getUser().subscribe(user => {
      this.name = user.displayName.split(' ')[0];
    });
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

  async showErrorAlert(error) {
    const alertMessage = await this.alertController.create({
      header: 'Ups... parece que ocurrio un error',
      subHeader: error,
      buttons: ['Salir']
    });
    alertMessage.present();
  }


  async displayFilter() {

    const categories = [];
    await this.stores.forEach(store => {
      if (categories.indexOf(store.Category.name) === -1) {
        categories.push(store.Category.name);
        console.log(`Se encontró categoria ${store.Category.name}`);
      }
    });

    const filterObject = new FilterObject('categorias', categories);

    const filterObjects = new Array<FilterObject>();

    filterObjects.push(filterObject);

    console.log(categories);

    const modal = await this.modalController.create({
      component: FilterPage,
      componentProps: {
        filterObjects
      },
      cssClass: 'filterModal'
    });

    await modal.present();
  }
}

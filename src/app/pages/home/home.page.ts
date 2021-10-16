/* eslint-disable @typescript-eslint/prefer-for-of */
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
  storesFiltered: Array<Store>;
  storesUnfiltered: Array<Store>;

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
          this.storesUnfiltered = this.stores;

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

    const distance = [];
    await this.stores.forEach(store => {

      const distanceFormat = store.delivery_time + ' M';

      if (distance.indexOf(distanceFormat) === -1) {
        distance.push(distanceFormat);
      }
    });

    const minimumOrder = [];

    await this.stores.forEach(store => {

      const minimumOrderObject = store.minimum_order;

      if (minimumOrder.indexOf(minimumOrderObject) === -1) {
        minimumOrder.push(minimumOrderObject);
      }
    });

    const filterObjectCategory = new FilterObject('categorias', categories);
    const filterObjectDistance = new FilterObject('domicilio', distance);
    const filterObjectMinimumOrder = new FilterObject('pedido minimo', minimumOrder);

    const filterObjects = new Array<FilterObject>();

    filterObjects.push(filterObjectDistance, filterObjectCategory, filterObjectMinimumOrder);

    console.log(categories);

    const modal = await this.modalController.create({
      component: FilterPage,
      componentProps: {
        filterObjects
      },
      cssClass: 'filterModal'
    });

    await modal.present();

    modal.onWillDismiss().then(data => {
      if (data.data) {
        console.log(data.data.filteredObjectResponse);
        this.filterData(data.data.filteredObjectResponse as FilterObject[]);
      }
    });


  }


  filterData(data: FilterObject[]) {

    console.log(data);

    this.storesUnfiltered = this.stores;

    this.storesFiltered = [];
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      console.log('entro a ', data[i].name);

      if (data[i].options.length > 0) {

        for (let j = 0; j < data[i].options.length; j++) {
          console.log('entro a ', data[i].name);
          switch (data[i].name) {
            case 'categorias':
              this.storesFiltered = this.storesFiltered.concat(this.stores.filter((store) => store.Category.name === data[i].options[j]));
              console.log('Status', this.storesFiltered);
              break;
            case 'domicilio':
              // eslint-disable-next-line max-len
              this.storesFiltered = this.storesFiltered.concat(this.stores.filter((store) => store.delivery_time === Number(data[i].options[j].split(' ')[0])));
              console.log('Status', this.storesFiltered);
              break;
          }
        }
      }
    }

    if (this.storesFiltered.length > 0) {
      this.stores = this.storesFiltered;
    } else {
      this.storesFiltered = null;
    }
  }


  cleanFilter() {
    this.stores = this.storesUnfiltered;
    this.storesFiltered = null;
  }

  searchStore($event: any) {
    const input = String($event.target.value).toLocaleLowerCase();
    this.storesFiltered = [];
    this.storesFiltered = this.storesFiltered.concat(this.stores.filter((store) => store.name.toLocaleLowerCase().includes(input)));
    this.stores = this.storesFiltered;
  }

  cancelCustomSearch() {
    this.stores = this.storesUnfiltered;
    this.storesFiltered = null;
  }
}

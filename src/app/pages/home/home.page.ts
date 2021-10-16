/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FilterObject } from 'src/app/model/filter-object';
import { StoreCategory } from 'src/app/model/store-category';
import { LoginService } from 'src/app/services/login.service';
import { StoreServiceService } from 'src/app/services/store-service.service';
import { Store } from '../../model/store';
import { FilterPage } from '../filter/filter.page';

@Component({
  selector: 'app-hme',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public stores: Array<Store>;
  public storesFiltered: Array<Store>;

  public category: StoreCategory;
  public name: string;

  public slideOpts: any;

  private storesUnfiltered: Array<Store>;


  constructor(private router: Router, private storeService: StoreServiceService, private alertController: AlertController,
    private loginService: LoginService, private modalController: ModalController) {

    this.slideOpts = {
      initialSlide: 1,
      speed: 600,
      autoplay: true
    };

  }

  async ngOnInit() {
    this.loadStores();
    await this.loginService.getUser().subscribe(user => {
      this.name = user.displayName.split(' ')[0];
    });
  }

  /**
   * Carga de tiendas disponibles
   */
  loadStores() {
    this.storeService.getAvailableStores()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.stores = data;
          this.storesUnfiltered = this.stores;
        },
        error: (error) => {
          this.showErrorAlert(error);
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

  /**
   * Disparador de filtro de tiendas.
   */
  async displayFilter() {

    const categoryFilter = this.categoryFilterLoad();

    const modal = await this.modalController.create({
      component: FilterPage,
      componentProps: {
        filterObjects: categoryFilter
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

  /**
   * Carga de filtros predefinidos con valores dinamicos
   *
   * @returns FilterObject
   */
  async categoryFilterLoad(): Promise<FilterObject[]> {
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

    return filterObjects;
  }


  /**
   * Motor de filtro.
   *
   * @param data
   */
  filterData(data: FilterObject[]) {

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
            case 'pedido minimo':
              this.storesFiltered = this.storesFiltered.concat(this.stores.filter((store) => store.minimum_order ===
                Number(data[i].options[j])));
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

  /**
   * Limpia el filtro
   */
  cleanFilter() {
    this.stores = this.storesUnfiltered;
    this.storesFiltered = null;
  }

  /**
   * Busca tienda por nombre basado en coincidencias.
   *
   * @param $event input que contiene el valor diligenciado de la barra de busqueda
   */
  searchStore($event: any) {
    const input = String($event.target.value).toLocaleLowerCase();
    this.storesFiltered = [];
    this.storesFiltered = this.storesFiltered.concat(this.stores.filter((store) => store.name.toLocaleLowerCase().includes(input)));
    this.stores = this.storesFiltered;
  }


  cancelCustomSearch(): void {
    this.stores = this.storesUnfiltered;
    this.storesFiltered = null;
  }
}

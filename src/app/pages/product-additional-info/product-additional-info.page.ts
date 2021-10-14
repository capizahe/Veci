/* eslint-disable @typescript-eslint/prefer-for-of */
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Option } from 'src/app/model/option';
import { Product } from 'src/app/model/product';
import { ProductOptionService } from 'src/app/services/product-option.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-additional-info',
  templateUrl: './product-additional-info.page.html',
  styleUrls: ['./product-additional-info.page.scss'],
})
export class ProductAdditionalInfoPage implements OnInit {

  public options: Option[];

  public description: string;

  public product: Product;

  public finalPrice: number;

  public itemSelected = false;

  private productId;

  private optionResponses = [];

  constructor(private activatedRouter: ActivatedRoute,
    private productOptionService: ProductOptionService,
    private productService: ProductService,
    @Inject(DOCUMENT) document, private alertController: AlertController,
    public toastController: ToastController, private router: Router) {

    this.productId = this.activatedRouter.snapshot.paramMap.get('id');

  }

  ngOnInit() {

    this.productService.getProductById(this.productId)
      .subscribe({
        next: (data) => {
          this.product = data[0];
          this.finalPrice = this.product.price;
        },
        complete: () => {

        },
        error: (error) => {
          console.log(error);
        }
      });

    this.productOptionService.getProductOptions(this.productId)
      .subscribe({
        next: (data) => {
          this.options = data;
          console.log(this.options);

          for (let i = 0; i < this.options.length; i++) {
            this.optionResponses[i] = '';
          }


        },
        complete: () => {

        },
        error: (error) => {
          console.log(error);
        }
      });

  }

  radioGroupChange($event, index) {

    // eslint-disable-next-line max-len
    document.getElementById(index).style.cssText = '--background: var(--ion-color-success); --ion-color-primary: var(--ion-color-success); ';

    console.log(this.options[index].name, $event);
    this.optionResponses[index] = {
      field: this.options[index].name,
      value: $event.detail.value.name,
      price: $event.detail.value.additionalPrice
    };

  }

  markItemAsNotResponded(index) {

    // eslint-disable-next-line max-len
    document.getElementById(index).style.cssText = '--background: var(--ion-color-damger); --ion-color-primary: var(--ion-color-danger); ';

  }

  getDescription() {

    let text = this.product.name;

    for (let i = 0; i < this.optionResponses.length; i++) {

      if (this.optionResponses[i]) {
        text += `#${this.optionResponses[i].field}=${this.optionResponses[i].value}`;
      }
    }
    return text;
  }

  getFinalPrice() {

    let finalPrice = this.product.price;

    for (let i = 0; i < this.optionResponses.length; i++) {

      if (this.optionResponses[i]) {
        finalPrice += this.optionResponses[i].price;
      }
    }
    return finalPrice;
  }

  /**
   * Agrega el producto al carrito
   */
  async addProductToCart() {

    let allFormCompleted = true;

    for (let i = 0; i < this.optionResponses.length; i++) {

      if (this.optionResponses[i] && this.optionResponses[i].value) {
        allFormCompleted = allFormCompleted && true;
      } else {
        allFormCompleted = false;
        this.markItemAsNotResponded(i);
      }
    }

    //Todos los campos han sido diligenciados
    if (allFormCompleted) {

      // eslint-disable-next-line max-len
      let messageAdd = 'Agregando item #' + this.product.id + 'nombre:' + this.product.name + 'precio final:' + this.finalPrice + 'descripcion:' + this.getDescription();

      messageAdd = 'El producto (' + this.product.name + ') se ha agregado al carrito';

      const toast = await this.toastController.create({
        message: messageAdd,
        mode: 'ios',
        duration: 3000,
        color: 'primary',
        position: 'middle'
      });

      toast.present()
        .finally(() => {
          this.router.navigateByUrl(`/store/${this.product.storeId}`);
        });

    } else {
      this.showErrorAlert();
    }

  }


  async showErrorAlert() {
    const alertMessage = await this.alertController.create({
      header: 'Por favor completa el formulario',
      buttons: ['ok'],
      mode: 'ios'
    });
    alertMessage.present();
  }


}

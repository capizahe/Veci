/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  private productId;

  private optionResponses = [];




  constructor(private router: ActivatedRoute, private productOptionService: ProductOptionService, private productService: ProductService) {

    this.productId = this.router.snapshot.paramMap.get('id');

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

    console.log(this.options[index].name, $event);
    this.optionResponses[index] = {
      field: this.options[index].name,
      value: $event.detail.value.name,
      price: $event.detail.value.additionalPrice
    };

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
}

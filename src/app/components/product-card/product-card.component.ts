import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/model/product';
import { AddProductPage } from 'src/app/pages/modals/add-product/add-product.page';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, AfterViewInit {

  @Input() product: Product;

  @ViewChild('regularPrice', { static: false }) regularPrice: ElementRef;

  @ViewChild('like', { static: false }) like: ElementRef;

  private productLiked = false;

  constructor(private router: Router, private modalController: ModalController) {
    //Validate if product was liked before by the user
  }

  ngAfterViewInit(): void {
    if (this.product.discountPrice !== 0 && this.product && this.regularPrice) {
      console.log(this.regularPrice);
      this.regularPrice.nativeElement.style = 'text-decoration: line-through';
    }
  }

  ngOnInit() {
  }

  likeProduct() {

    if (!this.productLiked) {
      this.like.nativeElement.style = 'color: red';
      this.productLiked = true;
    } else {
      this.like.nativeElement.style = 'color: black';
      this.productLiked = false;
    }

  }


  addProductToCart() {

    if (this.product.Options && this.product.Options.length > 0) {
      this.router.navigateByUrl(`/product-additional-info/${this.product.id}`);
    } else {
      //Add product to cart
    }
  }
  
  async showAddProductModal(){

    const modal = await this.modalController.create({
      component: AddProductPage,
      mode: 'ios',
      swipeToClose: true,
      showBackdrop: true,
      cssClass: 'action-modal',
      backdropDismiss: true,    
      componentProps: {
       product: this.product
      }
    })

    return modal.present();

  }


}

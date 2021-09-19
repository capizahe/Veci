import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product';

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

  constructor() {

    //Validate if product was liked before by the user

  }
  ngAfterViewInit(): void {
    if (this.product.discountPrice !== 0) {
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



}

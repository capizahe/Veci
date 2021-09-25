import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'src/app/model/store';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent implements OnInit {

  @Input() store: Store;

  @ViewChild('like', { static: false }) like: ElementRef;

  private productLiked = false;


  constructor(private router: Router) { }

  ngOnInit() { }

  likeProduct() {

    if (!this.productLiked) {
      this.like.nativeElement.style = 'color: red';
      this.productLiked = true;
    } else {
      this.like.nativeElement.style = 'color: black';
      this.productLiked = false;
    }

  }


  openStore() {
    console.log('opening store ', this.store.id);
    this.router.navigateByUrl(`/store/${this.store.id}`);
  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  storeId: string;

  constructor(private router: ActivatedRoute) {
    this.storeId = this.router.snapshot.paramMap.get('id');

  }

  ngOnInit() {
  }

}

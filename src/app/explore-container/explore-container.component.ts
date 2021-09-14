import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '../model/store';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() stores: Array<Store>;

  constructor(private router: Router) { }

  ngOnInit() { }

  openStore(store: Store) {
    console.log('opening store ', store);
    this.router.navigateByUrl(`/store/${store.id}`);
  }

}

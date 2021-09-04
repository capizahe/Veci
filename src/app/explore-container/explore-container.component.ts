import { Component, OnInit, Input } from '@angular/core';
import { Store } from '../model/store';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() stores: Array<Store>;

  constructor() { }

  ngOnInit() { }

}

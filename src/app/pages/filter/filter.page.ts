import { Component, Input } from '@angular/core';
import { FilterObject } from 'src/app/model/filter-object';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage {

  @Input() filterObjects: FilterObject[];

  constructor() { }

}

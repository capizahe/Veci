import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';
import { StoreCardComponent } from '../components/store-card/store-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ExploreContainerComponent, StoreCardComponent],
  exports: [ExploreContainerComponent, StoreCardComponent]
})
export class ExploreContainerComponentModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarsReviewPageRoutingModule } from './stars-review-routing.module';

import { StarsReviewPage } from './stars-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarsReviewPageRoutingModule
  ],
  declarations: [StarsReviewPage]
})
export class StarsReviewPageModule {}

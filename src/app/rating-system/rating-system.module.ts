import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingSystemPageRoutingModule } from './rating-system-routing.module';

import { RatingSystemPage } from './rating-system.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingSystemPageRoutingModule,
    NgbModule
  ],
  declarations: [RatingSystemPage]
})
export class RatingSystemPageModule {}

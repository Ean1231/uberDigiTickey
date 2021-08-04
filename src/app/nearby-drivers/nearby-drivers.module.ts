import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NearbyDriversPageRoutingModule } from './nearby-drivers-routing.module';

import { NearbyDriversPage } from './nearby-drivers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NearbyDriversPageRoutingModule
  ],
  declarations: [NearbyDriversPage]
})
export class NearbyDriversPageModule {}

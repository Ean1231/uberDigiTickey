import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectRidePageRoutingModule } from './select-ride-routing.module';

import { SelectRidePage } from './select-ride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectRidePageRoutingModule
  ],
  declarations: [SelectRidePage]
})
export class SelectRidePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectVehiclePageRoutingModule } from './select-vehicle-routing.module';

import { SelectVehiclePage } from './select-vehicle.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectVehiclePageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeOY9HNgcmPzOfmVsCgYl4UbGMqaYsq3E',
      libraries: ['places']
    }),
    AgmDirectionModule
  ],
  declarations: [SelectVehiclePage]
})
export class SelectVehiclePageModule {}

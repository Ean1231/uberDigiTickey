import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleRidePageRoutingModule } from './schedule-ride-routing.module';

import { ScheduleRidePage } from './schedule-ride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleRidePageRoutingModule
  ],
  declarations: [ScheduleRidePage]
})
export class ScheduleRidePageModule {}

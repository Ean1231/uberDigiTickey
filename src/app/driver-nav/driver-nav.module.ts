import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverNavPageRoutingModule } from './driver-nav-routing.module';

import { DriverNavPage } from './driver-nav.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DriverNavPageRoutingModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApzoLO9BpqIAgcqgmK-h0Ore0GrUCwmqw',
      libraries: ['places']
    }),
  ],
  declarations: [DriverNavPage]
})
export class DriverNavPageModule {}

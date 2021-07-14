import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetroutePageRoutingModule } from './setroute-routing.module';

import { SetroutePage } from './setroute.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetroutePageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeOY9HNgcmPzOfmVsCgYl4UbGMqaYsq3E',
      libraries: ['places']
    }),
    AgmDirectionModule,

  ],
  declarations: [SetroutePage]
})
export class SetroutePageModule {}

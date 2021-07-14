import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverVerifyPageRoutingModule } from './driver-verify-routing.module';

import { DriverVerifyPage } from './driver-verify.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverVerifyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DriverVerifyPage]
})
export class DriverVerifyPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneOrMailPageRoutingModule } from './phone-or-mail-routing.module';

import { PhoneOrMailPage } from './phone-or-mail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneOrMailPageRoutingModule
  ],
  declarations: [PhoneOrMailPage]
})
export class PhoneOrMailPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailVerifyPageRoutingModule } from './email-verify-routing.module';

import { EmailVerifyPage } from './email-verify.page';
import { FirebaseUIModule } from 'firebaseui-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailVerifyPageRoutingModule,
    FirebaseUIModule
  ],
  declarations: [EmailVerifyPage]
})
export class EmailVerifyPageModule {}

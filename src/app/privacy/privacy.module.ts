import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyPageRoutingModule } from './privacy-routing.module';

import { PrivacyPage } from './privacy.page';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyPageRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatProgressBarModule
  ],
  declarations: [PrivacyPage]
})
export class PrivacyPageModule {}

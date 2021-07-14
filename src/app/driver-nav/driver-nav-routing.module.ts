import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverNavPage } from './driver-nav.page';

const routes: Routes = [
  {
    path: '',
    component: DriverNavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverNavPageRoutingModule {}

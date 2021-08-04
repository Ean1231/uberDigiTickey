import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NearbyDriversPage } from './nearby-drivers.page';

const routes: Routes = [
  {
    path: '',
    component: NearbyDriversPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NearbyDriversPageRoutingModule {}

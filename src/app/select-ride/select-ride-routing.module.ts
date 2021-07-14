import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectRidePage } from './select-ride.page';

const routes: Routes = [
  {
    path: '',
    component: SelectRidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectRidePageRoutingModule {}

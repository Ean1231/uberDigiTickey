import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverVerifyPage } from './driver-verify.page';

const routes: Routes = [
  {
    path: '',
    component: DriverVerifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverVerifyPageRoutingModule {}

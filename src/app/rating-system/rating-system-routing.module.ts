import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingSystemPage } from './rating-system.page';

const routes: Routes = [
  {
    path: '',
    component: RatingSystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingSystemPageRoutingModule {}

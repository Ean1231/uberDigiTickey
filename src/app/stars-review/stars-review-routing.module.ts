import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StarsReviewPage } from './stars-review.page';

const routes: Routes = [
  {
    path: '',
    component: StarsReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarsReviewPageRoutingModule {}

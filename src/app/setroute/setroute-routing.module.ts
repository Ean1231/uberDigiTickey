import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetroutePage } from './setroute.page';

const routes: Routes = [
  {
    path: '',
    component: SetroutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetroutePageRoutingModule {}

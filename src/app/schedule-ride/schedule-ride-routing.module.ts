import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleRidePage } from './schedule-ride.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleRidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRidePageRoutingModule {}

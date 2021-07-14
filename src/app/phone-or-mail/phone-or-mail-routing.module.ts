import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneOrMailPage } from './phone-or-mail.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneOrMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneOrMailPageRoutingModule {}

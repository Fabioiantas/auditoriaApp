import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequisitoPage } from './requisito.page';

const routes: Routes = [
  {
    path: '',
    component: RequisitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequisitoPageRoutingModule {}

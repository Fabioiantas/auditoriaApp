import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemRequisitosPage } from './item-requisitos.page';

const routes: Routes = [
  {
    path: '',
    component: ItemRequisitosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRequisitosPageRoutingModule {}

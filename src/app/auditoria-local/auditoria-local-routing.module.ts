import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditoriaLocalPage } from './auditoria-local.page';

const routes: Routes = [
  {
    path: '',
    component: AuditoriaLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditoriaLocalPageRoutingModule {}

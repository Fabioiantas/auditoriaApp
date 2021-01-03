import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditarPage } from './auditar.page';

const routes: Routes = [
  {
    path: '',
    component: AuditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditarPageRoutingModule {}

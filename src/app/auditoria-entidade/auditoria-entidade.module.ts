import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditoriaEntidadePageRoutingModule } from './auditoria-entidade-routing.module';

import { AuditoriaEntidadePage } from './auditoria-entidade.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditoriaEntidadePageRoutingModule
  ],
  declarations: [AuditoriaEntidadePage]
})
export class AuditoriaEntidadePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditoriaLocalPageRoutingModule } from './auditoria-local-routing.module';

import { AuditoriaLocalPage } from './auditoria-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditoriaLocalPageRoutingModule
  ],
  declarations: [AuditoriaLocalPage]
})
export class AuditoriaLocalPageModule {}

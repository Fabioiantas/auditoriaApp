import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditarPageRoutingModule } from './auditar-routing.module';

import { AuditarPage } from './auditar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuditarPage]
})
export class AuditarPageModule {}

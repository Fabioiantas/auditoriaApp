import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemRequisitosPageRoutingModule } from './item-requisitos-routing.module';

import { ItemRequisitosPage } from './item-requisitos.page';
import { SharedComponentsModule } from '../shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemRequisitosPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [ItemRequisitosPage]
})
export class ItemRequisitosPageModule {}

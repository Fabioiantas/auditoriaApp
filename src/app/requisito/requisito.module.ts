import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequisitoPageRoutingModule } from './requisito-routing.module';

import { RequisitoPage } from './requisito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequisitoPageRoutingModule
  ],
  declarations: [RequisitoPage]
})
export class RequisitoPageModule {}

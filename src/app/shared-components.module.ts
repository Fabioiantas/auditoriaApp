import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RequisitoPage } from './requisito/requisito.page';

@NgModule({
  declarations: [RequisitoPage],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [RequisitoPage]
})
export class SharedComponentsModule { }

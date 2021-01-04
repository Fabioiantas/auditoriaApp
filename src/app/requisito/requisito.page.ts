import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AuditarPage } from '../auditar/auditar.page';
import { RequisitoLocalService } from '../services/requisito-local.service';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.page.html',
  styleUrls: ['./requisito.page.scss'],
})
export class RequisitoPage implements OnInit {

  @Input() auditoria: any;
  @Input() requisito: any;
  @Input() i: any;
  @Input() j: any;

  constructor(private toastCtrl: ToastController,
              private router: Router,
              private requisitoLocalService: RequisitoLocalService,
              private modalController: ModalController) { }

  ngOnInit() {
  }

  async buyItem(requisito: { name: any; }) {
    const toast = await this.toastCtrl.create({
      message: `Added to the cart: ${requisito.name}`
    });
    toast.present();
  }

  async auditar(requisito: any) {
    this.requisitoLocalService.changeLocalRequisito(requisito);
    this.router.navigate([`/auditar`]);
  }

  async presentModal(requisito: any) {
    const modal = await this.modalController.create({
      component: AuditarPage,
      cssClass: 'my-custom-class',
      componentProps: {
        auditoria: this.auditoria,
        requisito: this.requisito
      }
    });
    return await modal.present();
  }

}

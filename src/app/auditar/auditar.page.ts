import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Component({
  selector: 'app-auditar',
  templateUrl: './auditar.page.html',
  styleUrls: ['./auditar.page.scss'],
})
export class AuditarPage implements OnInit {
  @Input() auditoria: any;
  @Input() requisito: any;

  localRequisito: any;

  requisitoForm = new FormGroup({
    ie_conforme: new FormControl('', Validators.required),
    dt_prazo_adequacao: new FormControl('', Validators.required),
    ds_observacao: new FormControl('', Validators.required)
  });

  constructor(private storage: Storage,
              private modalCtrl: ModalController,
              private toastController: ToastController) { }


  ngOnInit() {
    this.requisitoForm.patchValue({
      ie_conforme: this.requisito.ie_conforme,
      dt_prazo_adequacao: !this.requisito.dt_prazo_adequacao ? null : moment(this.requisito.dt_prazo_adequacao).format('DD/MM/YYYY'),
      ds_observacao: this.requisito.ds_observacao
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  salvar() {
    this.auditoria.auditoria_entidade_items.forEach(itens => {
      itens.auditoria_entidade_it_requisitos.forEach(requisitos => {
        if (requisitos.id === this.requisito.id) {
          requisitos.ie_conforme = this.requisitoForm.value.ie_conforme;
          requisitos.dt_prazo_adequacao = !this.requisitoForm.value.dt_prazo_adequacao
            ? null : moment(this.requisitoForm.value.dt_prazo_adequacao).format('DD/MM/YYYY');
          requisitos.ds_observacao = this.requisitoForm.value.ds_observacao;
        }
      });
    });
    this.storage.set(this.auditoria.id, this.auditoria);
    this.showToast('Alteraçõs salvas com sucesso!');
    this.dismiss();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

}

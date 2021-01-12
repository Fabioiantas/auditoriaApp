import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { DatabaseService } from '../services/database.service';

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
    id: new FormControl('', Validators.required),
    ie_conforme: new FormControl('', Validators.required),
    dt_prazo_adequacao: new FormControl(''),
    ds_observacao: new FormControl('')
  });

  constructor(private modalCtrl: ModalController,
              private router: Router,
              private toastController: ToastController,
              private dataBaseService: DatabaseService) { }


  ngOnInit() {
    console.log('init requi ' + JSON.stringify(this.requisito));
    this.requisitoForm.patchValue({
      id: this.requisito.id,
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
    this.auditoria[0].auditoria_entidade_items.forEach(itens => {
      // console.log('items: ' + JSON.stringify(itens));
      itens.auditoria_entidade_it_requisitos.forEach(requisitos => {
        // console.log('for: ' + JSON.stringify(requisitos) + '<> this' + JSON.stringify(this.requisito.id));
        if (requisitos.id === this.requisito.id) {
          requisitos.ie_conforme = this.requisitoForm.value.ie_conforme;
          requisitos.dt_prazo_adequacao = !this.requisitoForm.value.dt_prazo_adequacao
            ? null : moment(this.requisitoForm.value.dt_prazo_adequacao).format('DD/MM/YYYY');
          requisitos.ds_observacao = this.requisitoForm.value.ds_observacao;
          //console.log('requisitos: ' + JSON.stringify(requisitos));
        }
      });
    });    
    for (let iterator of this.auditoria) {      
      const data = [
        JSON.stringify(iterator),
        iterator.id
      ];
      this.dataBaseService.updateRequisito(data).then(() => {
        this.showToast('Alteraçõs salvas com sucesso!');
        this.dismiss();
      });
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

}

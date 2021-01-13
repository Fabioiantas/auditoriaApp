import { DatabaseService } from './../services/database.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { AuditoriaEntidadeService } from './../services/auditoria-entidade.service';
import { IsLoadingService } from '../services/is-loading.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-auditoria-entidade',
  templateUrl: './auditoria-entidade.page.html',
  styleUrls: ['./auditoria-entidade.page.scss'],
})
export class AuditoriaEntidadePage implements OnInit {

  entidades = [];
  data: any[] = [];
  resultSet: any[];
  localAuditoria: any[] = [];

  constructor(private alertController: AlertController,
              private auditoriaEntidadeService: AuditoriaEntidadeService,
              private storage: Storage,
              private databaseService: DatabaseService,
              private isLoading: IsLoadingService) { }

  ngOnInit() {
    this.getEntidades();
    // this.selectAuditorias();
  }

  onCancel(event) {
    console.log(event);
  }

  onInput(event) {
    console.log(event.detail.data);
  }

  getEntidades2() {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById().subscribe(data => {
      this.entidades = data;
    });
  }

  getEntidades() {
    this.isLoading.present();
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById().subscribe(data => {
      for (let i = data.length - 1; i >= 0; i--) {
        this.databaseService.getLocalAuditoriaById(data[i].id).then((value) => {
          if (value.id) {
            data[i].local = 'true';
          }
        });
      }
      this.entidades = data;
      this.isLoading.dismiss();
    });
  }

  add(auditoria: any) {
    this.storage.set(auditoria.id, auditoria);
    const row = [
      auditoria.id,
      JSON.stringify(auditoria)
    ];
    this.databaseService.insertAuditoria(row);
    this.getEntidades();
  }

  remove(id: any) {
    this.storage.remove(id);
    this.databaseService.deleteAuditoria(id);
    this.getEntidades();
  }

  selectAuditorias() {
    this.databaseService.selectAuditorias().then((data: any) => {
    });
  }

  async presentAlertConfirm(id: any) {
    const   alert = await this.alertController.create({
      header: 'Confirmação!',
      message: 'Confirma remoção da Auditoria do Sistema?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            return;
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.remove(id);
          }
        }
      ]
    });
    await alert.present();
  }
}

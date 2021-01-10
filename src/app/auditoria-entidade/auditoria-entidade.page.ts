import { DatabaseService } from './../services/database.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { AuditoriaEntidadeService } from './../services/auditoria-entidade.service';
import { IsLoadingService } from '../services/is-loading.service';


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

  constructor(private auditoriaEntidadeService: AuditoriaEntidadeService,
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
          console.log('value ' + JSON.stringify(value));
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

  remove(entidade: any) {
    this.storage.remove(entidade.id);
    this.databaseService.deleteAuditoria(entidade.id);
    this.getEntidades();
  }

  selectAuditorias() {
    this.databaseService.selectAuditorias().then((data: any) => {
    });
  }
}

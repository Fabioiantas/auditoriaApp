import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { AuditoriaEntidadeService } from './../services/auditoria-entidade.service';
import { SqlService } from '../services/sql.service';
// import { JSDocTagName } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-auditoria-entidade',
  templateUrl: './auditoria-entidade.page.html',
  styleUrls: ['./auditoria-entidade.page.scss'],
})
export class AuditoriaEntidadePage implements OnInit {

  entidades = [];

  constructor(private auditoriaEntidadeService: AuditoriaEntidadeService,
              private storage: Storage,
              private sql: SqlService) { }

  ngOnInit() {
    this.getEntidades();
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

  getEntidade() {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById().subscribe(data => {
      for (let i = data.length - 1; i >= 0; i--) {
        this.entidades = data;
        this.storage.get(data[i].id).then((value) => {
          // console.log('existe ' + value);
          if (value) {
              data.splice(i, 1);
            }
        });
      }
    });
  }

  getEntidades() {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById().subscribe(data => {
      for (let i = data.length - 1; i >= 0; i--) {
        this.storage.get(data[i].id).then((value) => {
          // console.log('existe ' + value);
          if (value) {
            data[i].local = 'true';
            console.error('val ' + data[i].local);
            // console.error('val ' + JSON.stringify(value));
          }
        });
      }
      this.entidades = data;
      // console.log('entidade ' + JSON.stringify(data));
    });
  }

  add(entidade: any) {
    this.storage.set(entidade.id, entidade);
    this.getEntidades();
  }

  remove(entidade: any) {
    this.storage.remove(entidade.id);
    this.getEntidades();
  }

  getIconStatus() {

  }
}

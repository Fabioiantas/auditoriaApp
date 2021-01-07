import { DatabaseService } from './../services/database.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { AuditoriaEntidadeService } from './../services/auditoria-entidade.service';
import { SqlService } from '../services/sql.service';
import { ThrowStmt } from '@angular/compiler';
// import { JSDocTagName } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-auditoria-entidade',
  templateUrl: './auditoria-entidade.page.html',
  styleUrls: ['./auditoria-entidade.page.scss'],
})
export class AuditoriaEntidadePage implements OnInit {

  entidades = [];
  data: any[] = []

  constructor(private auditoriaEntidadeService: AuditoriaEntidadeService,
              private storage: Storage,
              private databaseService: DatabaseService) { }

  ngOnInit() {
    this.getEntidades();
    this.databaseService.dbState().subscribe((res) => {
      if(res){
        this.databaseService.fetchAuditoria().subscribe(item => {
          this.data = item
          console.log('data ' + JSON.stringify(item));
        });
      }
    });
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
          if (value) {
              data.splice(i, 1);
            }
        });
      }
    });
  }

  getEntidades() {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById().subscribe(data => {
      console.log('GETENTIDADE: '+ JSON.stringify(data));
      for (let i = data.length - 1; i >= 0; i--) {
        this.storage.get(data[i].id).then((value) => {
          if (value) {
            data[i].local = 'true';
          }
        });
      }
      this.entidades = data;
    });
  }

  add(entidade: any) {
    this.storage.set(entidade.id, entidade);
    entidade.auditoria_entidade_items.forEach(itens => {
      itens.auditoria_entidade_it_requisitos.forEach(requisitos => {
        this.databaseService.insertAuditoria(requisitos);
      });
    });
    this.getEntidades();
  }

  remove(entidade: any) {
    this.storage.remove(entidade.id);
    this.getEntidades();
  }

}

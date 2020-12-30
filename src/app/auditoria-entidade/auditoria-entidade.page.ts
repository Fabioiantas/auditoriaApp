import { DatabaseService } from './../services/database.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { AuditoriaEntidadeService } from './../services/auditoria-entidade.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-auditoria-entidade',
  templateUrl: './auditoria-entidade.page.html',
  styleUrls: ['./auditoria-entidade.page.scss'],
})
export class AuditoriaEntidadePage implements OnInit {
  
  entidades: any;

  constructor(private auditoriaEntidadeService: AuditoriaEntidadeService,
              private storage: Storage,
              private databaseService: DatabaseService) { }

  ngOnInit() {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById().subscribe(data => {
      this.entidades = data;
    });
  }

  onCancel(event) {
    console.log(event);
  }
  
  onInput(event) {
    console.log(event.detail.data);
  }

  getEntidades() {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById().subscribe(data => {
      this.entidades = data;
    });
  }

  add(entidade: any) {
    console.log(entidade)
    this.storage.set('auditoria', entidade);
    this.storage.get('auditoria').then((val) => {
      console.log('Your age is', val);
    });
  }

  teste() {
    return;
  }

}

import { DbService } from './../services/db.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { AuditoriaEntidadeService } from './../services/auditoria-entidade.service';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-auditoria-entidade',
  templateUrl: './auditoria-entidade.page.html',
  styleUrls: ['./auditoria-entidade.page.scss'],
})
export class AuditoriaEntidadePage implements OnInit {
  
  entidades: any;

  constructor(private auditoriaEntidadeService: AuditoriaEntidadeService,
              private storage: Storage,
              private db: DbService) { }

  ngOnInit() {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById().subscribe(data => {
      this.entidades = data;
    });
    this.getProd();
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
    this.storage.set(entidade.id, entidade);
    this.storage.get(entidade.id).then((val) => {
      console.log('Your age is', val);
    });
  }

  getProd() {
    this.db.getProductList().subscribe(data => {
      console.log('list ' + JSON.stringify(data));
    });
  }
}

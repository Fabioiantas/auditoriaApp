import { DbService } from './../services/db.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { AuditoriaEntidadeService } from './../services/auditoria-entidade.service';
import { timingSafeEqual } from 'crypto';
import { timeStamp } from 'console';

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
    this.getEntidades();
  }

  onCancel(event) {
    console.log(event);
  }
  
  onInput(event) {
    console.log(event.detail.data);
  }

  getEntidades() {
    this.auditoriaEntidadeService.getAuditoriaEntidadeItReqById().subscribe(data => {
      Object.keys(data).forEach(key => {
        this.storage.get(data[key].id).then((val) =>{
          data.splice(key, 1);
        });
      });
      this.entidades = data;
      console.log('data: ' + JSON.stringify(data));
    });
  }

  add(entidade: any) {
    //this.storage.remove(entidade.id);
    this.storage.set(entidade.id, entidade);
    /*this.storage.get(entidade.id).then((val) => {
      console.log('value is', val.nr_auditoria);
      val.nr_auditoria = 'alterado';
      this.storage.set(val.id, val);
      console.log('new value', val);
      
      console.log('new delete', val);
    });*/
  }
}

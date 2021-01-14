import { audit } from 'rxjs/operators';
import { sortBy } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-auditoria-local',
  templateUrl: './auditoria-local.page.html',
  styleUrls: ['./auditoria-local.page.scss'],
})
export class AuditoriaLocalPage implements OnInit {
  auditorias: any;
  searchListCopy: any;

  showSearch = false;

  constructor(private router: Router,
              private dataBaseService: DatabaseService) { }

  ngOnInit() {
   /*this.getAll().then((value) => {
    this.auditorias = value;
   });*/
   this.getAuditorias();
  }

  // getAll() {
  //   const items = [];
  //   return this.storage.forEach((value, key, index) => {
  //     if (key !== 'currentUser') {
  //       items.push((value));
  //     }
  //   }).then(() => {
  //       return items;
  //   });
  // }

  getAuditorias() {
    this.dataBaseService.getLocalAuditorias().then((value) => {
      this.auditorias = value;
    });
  }

  integrar(auditoria: any) {
    alert('Auditoria Integrada com sucesso!');
  }

  getTotalAuditados(requisitos: any) {
    let total = 0;
    for (const iterator of requisitos.auditoria_entidade_items) {
      for (const iterator2 of iterator.auditoria_entidade_it_requisitos) {
        if (iterator2.ie_conforme) {
          total = total + 1;
        }
      }
    }
    return total;
  }

  getTotalRequisitos(requisitos: any) {
    let total = 0;
    for (const iterator of requisitos.auditoria_entidade_items) {
      for (const iterator2 of iterator.auditoria_entidade_it_requisitos) {
          total = total + 1;
      }
    }
    return total;
  }

  itenRequisito(auditoria: any) {
    console.log('itenRequisito ' + JSON.stringify(auditoria.id));
    this.router.navigate([`/item-requisitos/${auditoria.id}`]);
  }

  onSearch() {
    this.showSearch = !this.showSearch;
    this.searchListCopy = JSON.parse(JSON.stringify(this.auditorias));
  }

  getItems(ev: any) {
    this.resetChanges();
    if (ev.target.value.trim() == ''){
      this.resetChanges();
      return;
    }
    this.auditorias = this.auditorias.filter((item)=>{
        return item.entidade.nm_entidade.toLowerCase().indexOf(ev.target.value.toLowerCase())>-1;
    });
  }

  protected resetChanges = () => {
      this.auditorias = this.searchListCopy;
  }


}

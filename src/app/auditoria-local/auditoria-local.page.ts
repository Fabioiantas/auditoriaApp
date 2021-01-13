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
    console.log('itenRequisito '+ JSON.stringify(auditoria.id));
    this.router.navigate([`/item-requisitos/${auditoria.id}`]);
  }

  onSearch() {
    this.showSearch = !this.showSearch;
  }

  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.auditorias = this.auditorias.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}

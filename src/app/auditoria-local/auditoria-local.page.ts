import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-auditoria-local',
  templateUrl: './auditoria-local.page.html',
  styleUrls: ['./auditoria-local.page.scss'],
})
export class AuditoriaLocalPage implements OnInit {
  auditorias: any;

  constructor(private storage: Storage,
              private router: Router) { }

  ngOnInit() {
   this.getAll().then((value) => {
    this.auditorias = value;
   });
  }

  getAll() {
    const items = [];
    return this.storage.forEach((v) => {
        items.push((v));
    }).then(() => {
        return items;
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
    this.router.navigate([`/item-requisitos/${auditoria.id}`]);
  }

}

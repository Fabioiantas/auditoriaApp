import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-auditoria-local',
  templateUrl: './auditoria-local.page.html',
  styleUrls: ['./auditoria-local.page.scss'],
})
export class AuditoriaLocalPage implements OnInit {
  auditorias: any;

  constructor(private storage: Storage) { }

  ngOnInit() {
   this.getAll().then((value) => {
    this.auditorias = value;
   });
  }

  getAll() {
    const items = [];
    return this.storage.forEach((v) => {
        items.push((v));
        // console.log(v);
    }).then(() => {
        return items;
    });
  }

  integrar(auditoria: any) {
    alert('Auditoria Integrada com sucesso!');
    console.log(JSON.stringify(auditoria));
  }

  getTotalAuditados(requisitos: any) {
    console.log(JSON.stringify(requisitos));
    // const total = [];
    // total[0] = 0;
    // total[1] = 0;

    // requisitos.forEach(element => {
    //   console.log('total?');
    //   console.log('conforme? ' + element.ie_conforme);
    //   if (requisitos.ie_conforme) {
    //       total[0] = total[0] + 1;
    //     }
    //   total[1] = total[1] + 1;
    // });
    // return total;
  }

}

import { RequisitoLocalService } from './../services/requisito-local.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-item-requisitos',
  templateUrl: './item-requisitos.page.html',
  styleUrls: ['./item-requisitos.page.scss'],
})
export class ItemRequisitosPage implements OnInit {

  auditoria: any;
  itemRequisitos  = [];
  automaticClose = false;
  public folder: string;

  constructor(private requisitoLocalService: RequisitoLocalService,
              private route: ActivatedRoute,
              private storage: Storage,
              private dataBaseService: DatabaseService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.getItemRequisitos(param.id);
    });
  }

  getItemRequisitos(id: any) {
    this.dataBaseService.localAuditoriaById(id).then((value) => {
      console.log('getItemRequisitos: ' + JSON.stringify(value));
      //this.itemRequisitos = value[0].auditoria_entidade_items;
      this.auditoria = value;
      //this.itemRequisitos[0].open = true;

    });
    /*this.storage.get(id).then((value) => {
      this.itemRequisitos = value.auditoria_entidade_items;
      this.auditoria = value;
      this.itemRequisitos[0].open = true;
    });*/
  }

  avaliar(requisito: any, situacao: string) {
    requisito.ie_conforme = situacao;
    this.requisitoLocalService.saveLocalRequisito(this.auditoria.id, requisito).subscribe(data => {
      this.auditoria = data;
      console.log(situacao + '-' + JSON.stringify(this.auditoria));
    });
  }

  toggleSection(index) {
    this.auditoria[0].auditoria_entidade_items[index].open = !this.auditoria[0].auditoria_entidade_items[index].open;

    if (this.automaticClose && this.itemRequisitos[index].open) {
      this.auditoria[0].auditoria_entidade_items
      .filter((item, itemIndex) => itemIndex !== index)
      .map(item => item.open = false);
    }
  }

  toggleItem(index, childIndex) {
    this.itemRequisitos[index].children[childIndex].open = !this.itemRequisitos[index].children[childIndex].open;
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemRequisitosService } from '../services/item-requisitos.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-item-requisitos',
  templateUrl: './item-requisitos.page.html',
  styleUrls: ['./item-requisitos.page.scss'],
})
export class ItemRequisitosPage implements OnInit {

  auditoria: any;
  itemRequisitos: any[];
  automaticClose = false;

  constructor(private itemRequisitosService: ItemRequisitosService,
              private route: ActivatedRoute,
              private storage: Storage) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.getItemRequisitos(param.id);
    });
  }

  getItemRequisitos(id: any) {
    this.storage.get(id).then((value) => {
      this.itemRequisitos = value.auditoria_entidade_items;
      this.auditoria = value;
      this.itemRequisitos[0].open = true;
    });
  }

  toggleSection(index) {
    this.itemRequisitos[index].open = !this.itemRequisitos[index].open;

    if (this.automaticClose && this.itemRequisitos[index].open) {
      this.itemRequisitos
      .filter((item, itemIndex) => itemIndex !== index)
      .map(item => item.open = false);
    }
  }

  toggleItem(index, childIndex) {
    this.itemRequisitos[index].children[childIndex].open = !this.itemRequisitos[index].children[childIndex].open;
  }

}
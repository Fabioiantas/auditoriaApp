import { DatabaseService } from './../services/database.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { AuditoriaEntidadeService } from './../services/auditoria-entidade.service';


@Component({
  selector: 'app-auditoria-entidade',
  templateUrl: './auditoria-entidade.page.html',
  styleUrls: ['./auditoria-entidade.page.scss'],
})
export class AuditoriaEntidadePage implements OnInit {

  entidades = [];
  data: any[] = [];

  constructor(private auditoriaEntidadeService: AuditoriaEntidadeService,
              private storage: Storage,
              private databaseService: DatabaseService) { }

  ngOnInit() {
    this.getEntidades();
    this.databaseService.dbState().subscribe((res) => {
      if (res) {
        this.databaseService.fetchAuditoria().subscribe(item => {
          this.data = item;
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
      console.log('GETENTIDADE: ' + JSON.stringify(data));
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

  add(auditoria: any) {
    this.storage.set(auditoria.id, auditoria);
    auditoria.auditoria_entidade_items.forEach(itens => {
      itens.auditoria_entidade_it_requisitos.forEach((requisito) => {
        // tslint:disable-next-line:no-shadowed-variable
        const row = [
          auditoria.auditoria_entidade_id,
          auditoria.nr_auditoria,
          auditoria.entidade_id,
          auditoria.entidade.cd_entidade,
          auditoria.entidade.nm_entidade,
          auditoria.entidade.nm_reduzido,
          auditoria.entidade.nr_cnpj,
          auditoria.entidade.nr_cpf,
          auditoria.entidade.ds_endereco,
          auditoria.entidade.email,
          auditoria.entidade.nr_telefone,
          auditoria.propriedade_id,
          auditoria.propriedade.nr_propriedade,
          auditoria.propriedade.nm_propriedade,
          auditoria.propriedade.ds_endereco_propriedade,
          auditoria.auditoria_nivel_id,
          auditoria.auditoria_nivel.nr_nivel_auditoria,
          auditoria.auditoria_nivel.tipo_atividade_id,
          null,
          auditoria.auditoria_nivel.nm_nivel,
          auditoria.auditoria_nivel.ds_nivel,
          auditoria.dt_inicio,
          auditoria.dt_fim,
          auditoria.dt_prazo,
          auditoria.dt_realizada,
          auditoria.dt_finalizada,
          auditoria.dt_validade,
          itens.id,
          itens.auditoria_item_id,
          itens.ds_item,
          itens.nr_porcentagem,
          requisito.id,
          requisito.ds_requisito,
          requisito.auditoria_requisito_id,
          requisito.classificacao_requisito_id,
          requisito.nm_classificacao,
          requisito.ds_observacao,
          requisito.nr_peso,
          requisito.ds_orientacao,
          requisito.ie_evidencia,
          requisito.ds_situacao,
          requisito.ie_conforme,
          requisito.dt_prazo_adequacao,
          requisito.dt_avaliacao
        ];
        this.databaseService.insertAuditoria(row);
      });
    });
    this.getEntidades();
  }

  remove(entidade: any) {
    this.storage.remove(entidade.id);
    this.getEntidades();
  }

}

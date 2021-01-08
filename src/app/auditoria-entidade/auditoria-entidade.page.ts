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

  add(entidade: any) {
    this.storage.set(entidade.id, entidade);
    entidade.auditoria_entidade_items.forEach(itens => {
      itens.auditoria_entidade_it_requisitos.forEach(() => {
        // tslint:disable-next-line:no-shadowed-variable
        const row = entidade.map(row => ({
          auditoria_entidade_id: row.auditoria_entidade_id,
          nr_auditoria: entidade.nr_auditoria,
          entidade_id: entidade.entidade_id,
          cd_entidade: entidade.entidade.cd_entidade,
          nm_entidade: entidade.entidade.nm_entidade,
          nm_reduzido: entidade.entidade.nm_reduzido,
          nr_cnpj: entidade.entidade.nr_cnpj,
          nr_cpf: entidade.entidade.nr_cpf,
          ds_endereco: entidade.entidade.ds_endereco,
          email: entidade.entidade.email,
          nr_telefone: entidade.entidade.nr_telefone,
          // propriedade
          propriedade_id: entidade.propriedade.propriedade_id,
          nr_propriedade: entidade.propriedade.nr_propriedade,
          nm_propriedade: entidade.propriedade.nm_propriedade,
          ds_endereco_propriedade: entidade.propriedade.ds_endereco,
          // nivel
          auditoria_nivel_id: entidade.auditoria_nivel_id,
          nr_nivel_auditoria: entidade.auditoria_nivel.nr_nivel_auditoria,
          tipo_atividade_id: entidade.auditoria_nivel.tipo_atividade_id,
          nm_tipo_atividade: entidade.auditoria_nivel.nm_tipo_atividade,
          nm_nivel: entidade.auditoria_nivel.nm_nivel,
          ds_nivel: entidade.auditoria_nivel.ds_nivel,
          dt_inicio: entidade.dt_inicio,
          dt_fim: entidade.dt_fim,
          dt_prazo: entidade.dt_prazo,
          dt_realizada: entidade.dt_realizada,
          dt_finalizada: entidade.dt_finalizada,
          dt_validade: entidade.dt_validade,
          // entidade_item,
          auditoria_entidade_item_id: row.auditoria_entidade_item_id,
          auditoria_item_id: itens.auditoria_item_id,
          ds_item: itens.ds_item,
          nr_porcentagem: itens.nr_porcentagem,
          // entidade_item_requisito,
          id: row.id,
          ds_requisito: row.ds_requisito,
          auditoria_requisito_id: row.auditoria_requisito_id,
          classificacao_requisito_id: row.classificacao_requisito_id,
          nm_classificacao: row.nm_classificacao,
          ds_observacao: row.ds_observacao,
          nr_peso: row.nr_peso,
          ds_orientacao: row.ds_orientacao,
          ie_evidencia: row.ie_evidencia,
          ds_situacao: row.ds_situacao,
          ie_conforme: row.ie_conforme,
          dt_prazo_adequacao: row.dt_prazo_adequacao,
          dt_avaliacao: row.dt_avaliacao
        }));
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

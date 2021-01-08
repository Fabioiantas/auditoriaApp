import { Platform, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private storage: SQLiteObject;
  auditoriaListSubject = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  auditoriaTable = 'CREATE TABLE IF NOT EXISTS auditoria (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'auditoria_entidade_id integer,' +
    'nr_auditoria          text,' +
    'entidade_id           text,' +
    'cd_entidade           integer,' +
    'nm_entidade           text,' +
    'nm_reduzido           text,' +
    'nr_cnpj               text,' +
    'nr_cpf                text,' +
    'ds_endereco           text,' +
    'email                 text,' +
    'nr_telefone           text,' +
    'propriedade_id        integer,' +
    'nr_propriedade        integer,' +
    'nm_propriedade        text,' +
    'ds_endereco_propriedade text,' +
    'auditoria_nivel_id    integer,' +
    'nr_nivel_auditoria    text,' +
    'tipo_atividade_id     text,' +
    'nm_tipo_atividade     text,' +
    'nm_nivel              text,' +
    'ds_nivel              text,' +
    'dt_inicio             text,' +
    'dt_fim                text,' +
    'dt_prazo              text,' +
    'dt_realizada          text,' +
    'dt_finalizada         text,' +
    'dt_validade           text,' +
    'auditoria_entidade_item_id integer,' +
    'auditoria_item_id          integer,' +
    'ds_item                    text,' +
    'nr_porcentagem             real,' +
    'entidade_item_requisito_id integer,' +
    'ds_requisito               text,' +
    'auditoria_requisito_id     integer,' +
    'classificacao_requisito_id integer,' +
    'nm_classificacao           text,' +
    'ds_observacao              text,' +
    'nr_peso                    real,' +
    'ds_orientacao              text,' +
    'ie_evidencia               text,' +
    'ds_situacao                text,' +
    'ie_conforme                text,' +
    'dt_prazo_adequacao         text,' +
    'dt_avaliacao               text' +
    ')';

  auditoriaInsert = 'INSERT INTO auditoria (' +
                    'auditoria_entidade_id,' +
                    'nr_auditoria,' +
                    'entidade_id,' +
                    'cd_entidade,' +
                    'nm_entidade,' +
                    'nm_reduzido,' +
                    'nr_cnpj,' +
                    'nr_cpf,' +
                    'ds_endereco,' +
                    'email,' +
                    'nr_telefone,' +
                    'propriedade_id,' +
                    'nr_propriedade,' +
                    'nm_propriedade,' +
                    'ds_endereco_propriedade,' +
                    'auditoria_nivel_id,' +
                    'nr_nivel_auditoria,' +
                    'tipo_atividade_id,' +
                    'nm_tipo_atividade,' +
                    'nm_nivel,' +
                    'ds_nivel,' +
                    'dt_inicio,' +
                    'dt_fim,' +
                    'dt_prazo,' +
                    'dt_realizada,' +
                    'dt_finalizada,' +
                    'dt_validade,' +
                    'auditoria_entidade_item_id,' +
                    'auditoria_item_id,' +
                    'ds_item,' +
                    'nr_porcentagem,' +
                    'entidade_item_requisito_id,' +
                    'ds_requisito,' +
                    'auditoria_requisito_id,' +
                    'classificacao_requisito_id,' +
                    'nm_classificacao,' +
                    'ds_observacao,' +
                    'nr_peso,' +
                    'ds_orientacao,' +
                    'ie_evidencia,' +
                    'ds_situacao,' +
                    'ie_conforme,' +
                    'dt_prazo_adequacao,' +
                    'dt_avaliacao)' +
        'VALUES' +
        '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

  constructor(private platform: Platform,
              private sqlite: SQLite,
              private toast: ToastController) {

    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'auditoria.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          try {
            this.storage = db;
            this.storage.executeSql(this.auditoriaTable).then(() => {
            console.log('tabela auditoria criada');
          });
          } catch (error) {
            console.log('############################ ' + JSON.stringify(error));
          }
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchAuditoria(): Observable<any[]> {
    return this.auditoriaListSubject.asObservable();
  }

  async selectAuditorias() {
    const res = await this.storage.executeSql('SELECT * FROM auditoria', []);
    const items: any[] = [];
    if (res.rows.length > 0) {
      for (let i = 0; i < res.rows.length; i++) {
        items.push({
          id: res.rows.item(i).id,
          artist_name: res.rows.item(i).artist_name,
          song_name: res.rows.item(i).song_name
        });
      }
    }
    this.auditoriaListSubject.next(items);
  }

  async insertAuditoria(row: any) {
    /*const data = [{
      auditoria_entidade_id: auditoria.auditoria_entidade_id,
      nr_auditoria: auditoria.nr_auditoria,
      entidade_id: auditoria.entidade_id,
      cd_entidade: auditoria.cd_entidade,
      nm_entidade: auditoria.nm_entidade,
      nm_reduzido: auditoria.nm_reduzido,
      nr_cnpj: auditoria.nr_cnpj,
      nr_cpf: auditoria.nr_cpf,
      ds_endereco: auditoria.ds_endereco,
      email: auditoria.email,
      nr_telefone: auditoria.nr_telefone,
      propriedade_id: auditoria.propriedade_id,
      nr_propriedade: auditoria.nr_propriedade,
      nm_propriedade: auditoria.nm_propriedade,
      ds_endereco_propriedade: auditoria.ds_endereco_propriedade,
      auditoria_nivel_id: auditoria.auditoria_nivel_id,
      nr_nivel_auditoria: auditoria.nr_nivel_auditoria,
      tipo_atividade_id: auditoria.tipo_atividade_id,
      nm_tipo_atividade: auditoria.nm_tipo_atividade,
      nm_nivel: auditoria.nm_nivel,
      ds_nivel: auditoria.ds_nivel,
      dt_inicio: auditoria.dt_inicio,
      dt_fim: auditoria.dt_fim,
      dt_prazo: auditoria.dt_prazo,
      dt_realizada: auditoria.dt_realizada,
      dt_finalizada: auditoria.dt_finalizada,
      dt_validade: auditoria.dt_validade,
      auditoria_entidade_item_id: auditoria.auditoria_entidade_item_id,
      auditoria_item_id: auditoria.auditoria_item_id,
      ds_item: auditoria.ds_item,
      nr_porcentagem: auditoria.nr_porcentagem,
      entidade_item_requisito_id: auditoria.entidade_item_requisito_id,
      ds_requisito: auditoria.ds_requisito,
      auditoria_requisito_id: auditoria.auditoria_requisito_id,
      classificacao_requisito_id: auditoria.classificacao_requisito_id,
      nm_classificacao: auditoria.nm_classificacao,
      ds_observacao: auditoria.ds_observacao,
      nr_peso: auditoria.nr_peso,
      ds_orientacao: auditoria.ds_orientacao,
      ie_evidencia: auditoria.ie_evidencia,
      ds_situacao: auditoria.ds_situacao,
      ie_conforme: auditoria.ie_conforme,
      dt_prazo_adequacao: auditoria.dt_prazo_adequacao,
      dt_avaliaca: auditoria.dt_avaliacao
    }];*/

    const res = await this.storage.executeSql(this.auditoriaInsert, row);
    this.selectAuditorias();
  }

  // Get single object
  async selectAuditoria(id: any): Promise<any> {
    const res = await this.storage.executeSql('SELECT * FROM auditoria WHERE id = ?', [id]);
    return {
      id: res.rows.item(0).id,
      artist_name: res.rows.item(0).artist_name,
      song_name: res.rows.item(0).song_name
    };
  }

  // Update
  async updateSong(id, song: any) {
    const data = [song.artist_name, song.song_name];
    await this.storage.executeSql(`UPDATE songtable SET artist_name = ?, song_name = ? WHERE id = ${id}`, data);
    this.selectAuditorias();
  }

  // Delete
  async deleteSong(id) {
    const _ = await this.storage.executeSql('DELETE FROM songtable WHERE id = ?', [id]);
    this.selectAuditorias();
  }

  async showToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}


import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'auditoria.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB().then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS auditoria (' +
        'id integer primary key AUTOINCREMENT NOT NULL,' +
        'auditoria_entidade_item_id integer,' +
        'auditoria_requisito_id integer,' +
        'classificacao_requisito_id integer,' +
        'nm_classificacao TEXT,' +
        'ds_observacao TEXT,' +
        'nr_peso REAL,' +
        'ds_orientacao TEXT,' +
        'ie_evidencia TEXT,' +
        'ds_situacao TEXT,' +
        'ie_conforme TEXT,' +
        'dt_prazo_adequacao  TEXT,' +
        'dt_avaliacao TEXT,' +
        ')']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  insertDefaultItems(db: SQLiteObject, auditoria: any) {
    db.executeSql(`select COUNT(id) as qtd from auditoria where id = ${auditoria.id}`)
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {
          // Criando as tabelas
          auditoria.forEach(element => {
            const auditoriaEntidadeId = element.id;
            element.auditoria_entidade_items.forEach(element2 => {
              const auditoriaEntidadeItemId = element2.id;
              element2.auditoria_entidade_it_requisitos.forEach(element3 => {
                db.sqlBatch([
                  ['insert into auditoria (     '+
                    'auditoria_entidade_id      '+
                    'auditoria_entidade_item_id,'+
                    'auditoria_requisito_id,    '+
                    'classificacao_requisito_id,'+
                    'nm_classificacao,          '+
                    'ds_observacao,             '+
                    'nr_peso,                   '+
                    'ds_orientacao,             '+
                    'ie_evidencia,              '+
                    'ds_situacao,               '+
                    'ie_conforme,               '+
                    'dt_prazo_adequacao,        '+
                    'dt_avaliacao)              '+
                    'values (?,?,?,?,?,?,?,?,?,?,?,?,?)',
                     [auditoriaEntidadeId,
                      auditoriaEntidadeItemId,
                      element3.auditoria_requisito_id,
                      element3.classificacao_requisito_id,
                      element3.nm_classificacao,
                      element3.ds_observacao,
                      element3.nr_peso,
                      element3.ds_orientacao,
                      element3.ie_evidencia,
                      element3.ds_situacao,
                      element3.ie_conforme,
                      element3.dt_prazo_adequacao,
                      element3.dt_avaliacao
                    ]]
                ])
                  .then(() => console.log('Dados incluídos'))
                  .catch(e => console.error('Erro ao incluir dados', e));
              });
            });
          });

        } else {
          return;
        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }
}


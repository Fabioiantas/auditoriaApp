import { Platform, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { audit } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private storage: SQLiteObject;
  auditoriaListSubject = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  auditorias: any;


  auditoriaTable = 'CREATE TABLE IF NOT EXISTS auditoria (' +
      'id INTEGER primary key not null,' +
      'json          TEXT NOT NULL' +
      ')';

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

  getLocalAuditoriaById(id): Promise<any> {
    return this.storage.executeSql('SELECT * FROM auditoria WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id
      };
    });
  }  

  getLocalAuditorias() {
    return this.storage.executeSql('SELECT * FROM auditoria', []).then(data => {
      const auditorias: any[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          let skills = [];
          if (data.rows.item(i).skills !== '') {
            skills = JSON.parse(data.rows.item(i).json);
          }
          auditorias.push(skills);
        }
      }
      return auditorias;
    });
  }

  localAuditoriaById(id: any) {
    return this.storage.executeSql('SELECT * FROM auditoria where id = ?', [id]).then(data => {
      const auditorias: any[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          let skills = [];
          if (data.rows.item(i).skills !== '') {
            skills = JSON.parse(data.rows.item(i).json);
          }
          auditorias.push(skills);
        }
      }      
      return auditorias;
    });
  }

  async selectAuditorias() {
    const sql = 'select json from auditoria';
    const res = await this.storage.executeSql(sql, []);
    const items: any[] = [];
    if (res.rows.length > 0) {
      for (let i = 0; i < res.rows.length; i++) {
        items.push(
          res.rows.item(i).json
         );
      }
    }
    this.auditoriaListSubject.next(items);
    return items;
  }

  async selectLocalAuditoriaById(id: any) {
    const sql = 'select json from auditoria where id = ?';
    const res = await this.storage.executeSql(sql, [id]);
    const items: any[] = [];
    if (res.rows.length > 0) {
      for (let i = 0; i < res.rows.length; i++) {
        items.push(
          res.rows.item(i).json
         );
      }
    }
    this.auditoriaListSubject.next(items);
    return items;
  }


  async insertAuditoria(row: any) {
    const res = await this.storage.executeSql('insert into auditoria(id, json)values(?,?)', row);
    console.log('insert row');
  }

  // Update
  async updateRequisito(data: any) {
    await this.storage.executeSql(`UPDATE auditoria
                                      SET json = ?
                                    WHERE id = ?`, data);
  }

  // Delete
  async deleteAuditoria(id) {
    const _ = await this.storage.executeSql('DELETE FROM auditoria WHERE id = ?', [id]);
  }
}


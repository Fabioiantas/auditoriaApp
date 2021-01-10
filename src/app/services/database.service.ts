import { Platform, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private storage: SQLiteObject;
  auditoriaListSubject = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


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
  async updateSong(id, song: any) {
    const data = [song.artist_name, song.song_name];
    await this.storage.executeSql(`UPDATE songtable SET artist_name = ?, song_name = ? WHERE id = ${id}`, data);
    this.selectAuditorias();
  }

  // Delete
  async deleteAuditoria(id) {
    const _ = await this.storage.executeSql('DELETE FROM auditoria WHERE id = ?', [id]);
  }

  async showToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}


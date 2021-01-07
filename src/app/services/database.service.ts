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

  auditoriatable = 'CREATE TABLE IF NOT EXISTS auditoria (' +
    'id integer primary key,' +
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
    'dt_avaliacao TEXT' +
    ')';
  
  auditoriaInsert = 'INSERT INTO auditoria ('+
            'id,'+      
            'auditoria_entidade_item_id,'+      
            'auditoria_requisito_id,'+      
            'classificacao_requisito_id,'+      
            'nm_classificacao,'+      
            'ds_observacao,'+      
            'nr_peso,'+      
            'ds_orientacao,'+      
            'ie_evidencia,'+      
            'ds_situacao,'+     
            'ie_conforme,'+     
            'dt_prazo_adequacao,'+      
            'dt_avaliacao ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  constructor(private platform: Platform,
              private sqlite: SQLite,
              private toast: ToastController) {
    
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'auditoria2.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.storage.executeSql(this.auditoriatable);
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchAuditoria(): Observable<any[]> {
    return this.auditoriaListSubject.asObservable();
  }

  

  // Get list
  selectAuditorias() {
    return this.storage.executeSql('SELECT * FROM auditoria', []).then(res => {
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            artist_name: res.rows.item(i).artist_name,
            song_name: res.rows.item(i).song_name
          });
        }
      }
      this.auditoriaListSubject.next(items);
    });
  }

  // Add
  insertAuditoria(auditoria: any) {
    let data = [
      auditoria.id,
      auditoria.auditoria_entidade_item_id,
      auditoria.auditoria_requisito_id,
      auditoria.classificacao_requisito_id,
      auditoria.nm_classificacao,
      auditoria.ds_observacao,
      auditoria.nr_peso,
      auditoria.ds_orientacao,
      auditoria.ie_evidencia,
      auditoria.ds_situacao,
      auditoria.ie_conforme,
      auditoria.dt_prazo_adequacao,
      auditoria.dt_avaliacao     
    ];
    return this.storage.executeSql(this.auditoriaInsert, data)
      .then(res => {
        this.selectAuditorias();
      });
  }

  // Get single object
  selectAuditoria(id): Promise<any> {
    return this.storage.executeSql('SELECT * FROM auditoria WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        artist_name: res.rows.item(0).artist_name,
        song_name: res.rows.item(0).song_name
      }
    });
  }

  // Update
  updateSong(id, song: any) {
    let data = [song.artist_name, song.song_name];
    return this.storage.executeSql(`UPDATE songtable SET artist_name = ?, song_name = ? WHERE id = ${id}`, data)
      .then(data => {
        this.selectAuditorias();
      })
  }

  // Delete
  deleteSong(id) {
    return this.storage.executeSql('DELETE FROM songtable WHERE id = ?', [id])
      .then(_ => {
        this.selectAuditorias();
      });
  }

  async showToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}


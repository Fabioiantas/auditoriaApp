import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { Platform, ToastController } from '@ionic/angular';
// import { isEmpty, isNull, keys, sortBy, get, parseInt } from 'lodash';
import { browserDBInstance } from '../browser';

declare var window: any;
// const SQL_DB_NAME = process.env.IONIC_ENV === 'dev' ? '__broswer.db' : '__native.db';
const SQL_DB_NAME =  'auditoria.db';

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  dbInstance: any;

  constructor(private sqlite: SQLite,
              private platform: Platform,
              private toast: ToastController) {
    this.init();
  }

  async init() {
    if (!this.platform.is('cordova')) {
      const db = window.openDatabase(SQL_DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
      this.dbInstance = browserDBInstance(db);
      this.dbInstance.executeSql('CREATE TABLE IF NOT EXISTS requisito(id INTEGER PRIMARY KEY, name)');
      this.dbInstance.executeSql(`INSERT INTO requisito(id, user) VALUES (1, 'Suraj')`);
      const users = this.dbInstance.executeSql('SELECT * FROM requisito');
      users.then((value) => {
        console.log('promisse: ' + JSON.stringify(value));
        this.showToast('promisse: ' + JSON.stringify(value));
      });
      console.log(JSON.stringify(users));
      this.showToast('user: ' + JSON.stringify(users));
    } else {
      this.dbInstance = await this.sqlite.create({
        name: SQL_DB_NAME,
        location: 'default'
      });
    }
  }
  
  async showToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 10000
    });
    toast.present();
  }
}

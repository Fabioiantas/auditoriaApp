import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { Platform } from '@ionic/angular';
import { isEmpty, isNull, keys, sortBy, get, parseInt } from 'lodash';
import { browserDBInstance } from '../browser';

declare var window: any;
// const SQL_DB_NAME = process.env.IONIC_ENV === 'dev' ? '__broswer.db' : '__native.db';
const SQL_DB_NAME =  '__broswer.db';

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  dbInstance: any;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.init();
  }

  async init() {
    if (!this.platform.is('cordova')) {
      const db = window.openDatabase(SQL_DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
      this.dbInstance = browserDBInstance(db);
    } else {
      this.dbInstance = await this.sqlite.create({
        name: SQL_DB_NAME,
        location: 'default'
      });
    }
  }
}

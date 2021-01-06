import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Baixar Auditoria',
      url: '/auditoria-entidade',
      icon: 'mail'
    },
    {
      title: 'Auditorias',
      url: '/auditoria-local',
      icon: 'paper-plane'
    },
    {
      title: 'Itens',
      url: '/item-requisitos/4',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  currentUser: any;

  constructor(private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private storage: Storage) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.storage.get('currentUser').then((value) => {
      this.currentUser = JSON.parse(value);
    });
  }
}

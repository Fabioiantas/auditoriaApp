import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.page.html',
  styleUrls: ['./requisito.page.scss'],
})
export class RequisitoPage implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('requisito') requisito: any;
  // tslint:disable-next-line:no-input-rename
  @Input('i') i: any;
  // tslint:disable-next-line:no-input-rename
  @Input('j') j: any;

  constructor(private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }

  async buyItem(requisito: { name: any; }) {
    const toast = await this.toastCtrl.create({
      message: `Added to the cart: ${requisito.name}`
    });
    toast.present();
  }

  async auditar(requisito: any) {
    const toast = await this.toastCtrl.create({
      message: `Auditar : ${requisito.ie_conforme}`,
      duration: 2000
    });
    toast.present();
  }

}

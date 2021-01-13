import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integracao',
  templateUrl: './integracao.page.html',
  styleUrls: ['./integracao.page.scss'],
})
export class IntegracaoPage implements OnInit {
  showSearch = false;
  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    this.showSearch = !this.showSearch;
  }

  onInput($event) {
    console.log(JSON.stringify($event));
  }

}

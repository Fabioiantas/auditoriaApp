import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { timeStamp } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequisitoLocalService {

  public requisito: any = null;
  public requisitoBehavior = new BehaviorSubject(this.requisito);
  currentRequisito = this.requisitoBehavior.asObservable();

  constructor(private storage: Storage) {}

  changeLocalRequisito(auditoria: any) {
    this.storage.set(auditoria.id, auditoria);
    this.requisitoBehavior.next(auditoria);
  }
}

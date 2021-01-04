import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { audit } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequisitoLocalService {

  public requisito: any = null;
  public requisitoBehavior = new BehaviorSubject(this.requisito);
  currentRequisito = this.requisitoBehavior.asObservable();

  constructor(private storage: Storage) {}

  changeLocalAuditoria(auditoria: any) {
    this.storage.set(auditoria.id, auditoria);
    this.requisitoBehavior.next(auditoria);
  }

  saveLocalRequisito(auditoriaId: any, requisito: any): Observable<any> {
    this.storage.get(auditoriaId).then((auditoria) => {
      if (auditoria){
        auditoria.auditoria_entidade_items.forEach(itens => {
          itens.auditoria_entidade_it_requisitos.forEach(requisitos => {
            if (requisitos.id === requisito.id) {
              requisitos.ie_conforme = requisito.ie_conforme;
              requisitos.dt_prazo_adequacao = !requisito.dt_prazo_adequacao
                ? null : moment(requisito.dt_prazo_adequacao).format('DD/MM/YYYY');
              requisitos.ds_observacao = requisito.ds_observacao;
            }
          });
        });
        this.storage.set(auditoriaId, auditoria);
        this.requisitoBehavior.next(auditoria);
      }
    });
    return this.currentRequisito;
  }


}

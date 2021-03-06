import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemRequisitosService {

  constructor(private http: HttpClient) { }

  getAuditoriaEntidadeItReqById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/auditoriaentidadeitreqs/${id}`);
  }
}

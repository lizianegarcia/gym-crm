import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Plano {
  id?: number;
  nome: string;
  valor: number;
  duracaoMeses: number;
}

@Injectable({ providedIn: 'root' })
export class PlanoService {

  private api = `${environment.apiUrl}/planos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Plano[]> {
    return this.http.get<Plano[]>(this.api);
  }

  buscarPorId(id: number): Observable<Plano> {
    return this.http.get<Plano>(`${this.api}/${id}`);
  }

  criar(plano: Plano): Observable<Plano> {
    return this.http.post<Plano>(this.api, plano);
  }

  atualizar(id: number, plano: Plano): Observable<Plano> {
    return this.http.put<Plano>(`${this.api}/${id}`, plano);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

}

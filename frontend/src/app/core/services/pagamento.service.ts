import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagamento } from '../models/pagamento.model';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private api = 'http://localhost:3000/pagamentos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(this.api);
  }

  criar(pagamento: Pagamento): Observable<Pagamento> {
    return this.http.post<Pagamento>(this.api, pagamento);
  }

  atualizar(id: number, pagamento: Pagamento): Observable<Pagamento> {
    return this.http.put<Pagamento>(`${this.api}/${id}`, pagamento);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

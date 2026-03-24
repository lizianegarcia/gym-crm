import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CriarPagamentoDTO, Pagamento } from '../models/pagamento.model';


@Injectable({ providedIn: 'root' })
export class PagamentoService {

  private api = 'http://localhost:3000/pagamentos';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Pagamento[]>(this.api);
  }

  criar(data: CriarPagamentoDTO) {
    return this.http.post<Pagamento>(this.api, data);
  }
}

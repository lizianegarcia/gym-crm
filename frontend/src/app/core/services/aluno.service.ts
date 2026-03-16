import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Aluno {
  id?: number;
  nome: string;
  cpf: string;
  telefone?: string;
  email?: string;
  status: string;
  planoId: number;
}

@Injectable({ providedIn: 'root' })
export class AlunoService {
  private api = 'http://localhost:3000/alunos';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Aluno[]>(this.api);
  }

  buscarPorId(id: number) {
    return this.http.get<Aluno>(`${this.api}/${id}`);
  }

  criar(aluno: Aluno) {
    return this.http.post<Aluno>(this.api, aluno);
  }

  atualizar(aluno: Aluno) {
    return this.http.put<Aluno>(`${this.api}/${aluno.id}`, aluno);
  }

  deletar(id: number) {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

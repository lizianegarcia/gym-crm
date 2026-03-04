import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../models/aluno.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlunoService {
  private api = 'http://localhost:3000/alunos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.api);
  }

  buscarPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.api}/${id}`);
  }

  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.api, aluno);
  }

  atualizar(aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.api}/${aluno.id}`, aluno);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

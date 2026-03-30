import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private api = `${environment.apiUrl}/alunos`;

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

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

}

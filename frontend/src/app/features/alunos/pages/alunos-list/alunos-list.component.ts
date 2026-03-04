import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlunoService } from '../../../../core/services/aluno.service';
import { Aluno } from '../../../../core/models/aluno.model';

@Component({
  selector: 'app-alunos-list',
  templateUrl: './alunos-list.component.html',
  styleUrls: ['./alunos-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,    
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AlunosListComponent implements OnInit {
  alunos: Aluno[] = [];
  alunosFiltrados: Aluno[] = [];
  filtro: string = '';
  colunas: string[] = ['nome', 'cpf', 'plano'];

  constructor(private alunoService: AlunoService) {}

  ngOnInit() {
    this.alunoService.listar().subscribe((data) => {
      this.alunos = data;
      this.alunosFiltrados = data;
    });
  }

  aplicarFiltro() {
    const f = this.filtro.toLowerCase();
    this.alunosFiltrados = this.alunos.filter(
      (a) => a.nome.toLowerCase().includes(f) || a.cpf.includes(f)
    );
  }
}

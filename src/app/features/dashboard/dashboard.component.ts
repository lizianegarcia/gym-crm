import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../core/services/aluno.service';
import { Aluno } from '../../core/models/aluno.model';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule]
})
export class DashboardComponent implements OnInit {
  totalAlunos = 0;
  ativos = 0;
  inadimplentes = 0;
  planos: Record<string, number> = {};

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.alunoService.listar().subscribe(alunos => this.calcularStats(alunos));
  }

  private calcularStats(alunos: Aluno[]) {
    this.totalAlunos = alunos.length;
    this.ativos = alunos.filter(a => a.status === 'ATIVO').length;
    this.inadimplentes = alunos.filter(a => a.status === 'INADIMPLENTE').length;

    this.planos = {};
    alunos.forEach(a => {
      if(a.plano) {
        this.planos[a.plano] = (this.planos[a.plano] || 0) + 1;
      }
    });
  }
}

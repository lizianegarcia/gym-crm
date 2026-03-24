import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { AlunoService } from '../../core/services/aluno.service';
import { Aluno } from '../../core/models/aluno.model';
import { ChangeDetectorRef } from '@angular/core';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  alunosAtivos = 0;
  faturamento = 0;
  inadimplentes = 0;
  novosAlunos = 0;

  chart: any;

  constructor(private alunoService: AlunoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarDashboard();
  }

  ngAfterViewInit() {
    // vazio por enquanto (gráfico será criado após dados)
  }

  carregarDashboard() {
    this.alunoService.listar().subscribe({
      next: (alunos: Aluno[]) => {

  const hoje = new Date();

  this.alunosAtivos = 0;
  this.inadimplentes = 0;
  this.faturamento = 0;
  this.novosAlunos = 0;

  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  alunos.forEach(aluno => {

    const vencimento = aluno.dataVencimento
      ? new Date(aluno.dataVencimento)
      : null;

    const inicio = aluno.dataInicio
      ? new Date(aluno.dataInicio)
      : null;

    const valorPlano = aluno.plano?.valor || 0;

    if (vencimento && vencimento >= hoje) {
      this.alunosAtivos++;
      this.faturamento += valorPlano;
    }

    if (vencimento && vencimento < hoje) {
      this.inadimplentes++;
    }

    if (inicio && inicio >= inicioMes) {
      this.novosAlunos++;
    }

  });

  this.cdr.detectChanges();

  // gráfico
  setTimeout(() => this.criarGrafico());
}



    });
  }

  criarGrafico() {

    // evita recriar gráfico duplicado
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('grafico', {
      type: 'bar',
      data: {
        labels: ['Ativos', 'Inadimplentes', 'Novos'],
        datasets: [{
          label: 'Alunos',
          data: [
            this.alunosAtivos,
            this.inadimplentes,
            this.novosAlunos
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

  }

}

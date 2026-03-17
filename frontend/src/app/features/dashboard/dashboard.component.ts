import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { AlunoService } from '../alunos/../alunos/../../core/services/aluno.service';
import { PlanoService } from '../../core/services/plano.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',

  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class DashboardComponent implements OnInit {

  alunosAtivos = 0;
  faturamento = 0;
  inadimplentes = 0;
  novosAlunos = 0;

  constructor(
    private alunoService: AlunoService,
    private planoService: PlanoService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {

    this.alunoService.listar().subscribe(alunos => {

      this.alunosAtivos = alunos.filter(a => a.status === 'ATIVO').length;

      // Simulação de inadimplência (ex: status diferente de ATIVO)
      this.inadimplentes = alunos.filter(a => a.status !== 'ATIVO').length;

      // Novos alunos do mês (simples por enquanto)
      this.novosAlunos = alunos.length;

      this.calcularFaturamento(alunos);

    });

  }

  calcularFaturamento(alunos: any[]) {

    this.planoService.listar().subscribe(planos => {

      let total = 0;

      alunos.forEach(aluno => {

        const plano = planos.find(p => p.id === aluno.planoId);

        if (plano && aluno.status === 'ATIVO') {
          total += plano.valor;
        }

      });

      this.faturamento = total;

    });

  }

}

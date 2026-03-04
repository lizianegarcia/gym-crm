import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../core/services/aluno.service';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { CardMetricComponent } from '../../shared/components/card-metric/card-metric.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, ChartComponent, CardMetricComponent]
})
export class DashboardComponent implements OnInit {
  totalAlunos = 0;
  ativos = 0;
  inadimplentes = 0;
  planos: any = {};

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.alunoService.listar().subscribe((alunos) => {
      this.totalAlunos = alunos.length;
      this.ativos = alunos.filter(a => a.status === 'ATIVO').length;
      this.inadimplentes = alunos.filter(a => a.status === 'INADIMPLENTE').length;
      this.planos = alunos.reduce((acc, a) => {
        acc[a.plano] = (acc[a.plano] || 0) + 1;
        return acc;
      }, {} as any);
    });
  }
}

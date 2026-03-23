import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { PagamentoService } from '../../../../core/services/pagamento.service';
import { Pagamento } from '../../../../core/models/pagamento.model';

import { AlunoService } from '../../../../core/services/aluno.service';
import { Aluno } from '../../../../core/models/aluno.model';

@Component({
  selector: 'app-pagamentos-list',
  standalone: true,
  templateUrl: './pagamentos-list.component.html',

  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class PagamentosListComponent implements OnInit {

  displayedColumns = ['aluno', 'valor', 'data', 'status'];

  dataSource = new MatTableDataSource<Pagamento>();

  alunosMap = new Map<number, string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pagamentoService: PagamentoService,
    private alunoService: AlunoService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {

    this.alunoService.listar().subscribe((alunos: Aluno[]) => {

      // cria mapa id → nome
      alunos.forEach(a => {
        if (a.id) this.alunosMap.set(a.id, a.nome);
      });

      this.pagamentoService.listar().subscribe((pagamentos: Pagamento[]) => {

        this.dataSource.data = pagamentos;
        this.dataSource.paginator = this.paginator;

      });

    });

  }

  getNomeAluno(alunoId: number): string {
    return this.alunosMap.get(alunoId) || 'Aluno não encontrado';
  }

}

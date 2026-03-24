import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AlunoService } from '../../../../core/services/aluno.service';
import { Aluno } from '../../../../core/models/aluno.model';

import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { PagamentoService } from '../../../../core/services/pagamento.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alunos-list',
  standalone: true,
  templateUrl: './alunos-list.component.html',
  styleUrls: ['./alunos-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
  ]
})
export class AlunosListComponent implements OnInit {

  dataSource = new MatTableDataSource<Aluno>([]);

  filtro: string = '';

  colunas = ['nome', 'cpf', 'plano', 'statusFinanceiro', 'acoes'];

  constructor(
    private alunoService: AlunoService,
    private pagamentoService: PagamentoService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
  this.carregarDados();
  this.dataSource.filterPredicate = (data: any, filter: string) => {
    return data.nome.toLowerCase().includes(filter) ||
           data.cpf.includes(filter);
  };

  }

  carregarDados() {
  this.alunoService.listar().subscribe({
    next: (alunos) => {
      this.dataSource.data = alunos;
    },
    error: () => {
      this.snack.open('Erro ao carregar alunos', 'Fechar', {
        duration: 3000
      });
    }
  });
}

  aplicarFiltro() {
  this.dataSource.filter = this.filtro.trim().toLowerCase();
}

  getStatusFinanceiro(aluno: any): string {

    if (!aluno.dataVencimento) return 'SEM_PAGAMENTO';

    const hoje = new Date();
    const vencimento = new Date(aluno.dataVencimento);

    return hoje > vencimento ? 'INADIMPLENTE' : 'EM_DIA';
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'EM_DIA': return '🟢 Em dia';
      case 'INADIMPLENTE': return '🔴 Inadimplente';
      default: return '⚪ Sem pagamento';
    }
  }

  getRowClass(aluno: any): string {
    return this.getStatusFinanceiro(aluno) === 'INADIMPLENTE'
      ? 'linha-inadimplente'
      : '';
  }

  pagamentoRapido(aluno: any) {

    const valor = aluno.plano?.valor;

    if (!valor) {
      this.snack.open('Aluno sem plano definido', 'Fechar', {
        duration: 3000
      });
      return;
    }

    this.pagamentoService.criar({
      valor,
      alunoId: aluno.id
    }).subscribe({

      next: () => {

        this.snack.open('Pagamento registrado 💰', 'OK', {
          duration: 2500
        });

        this.carregarDados();

      },

      error: () => {
        this.snack.open('Erro ao registrar pagamento', 'Fechar', {
          duration: 3000
        });
      }

    });

  }

  excluir(id: number) {

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: {
      titulo: 'Excluir aluno',
      mensagem: 'Deseja realmente excluir este aluno?'
    }
  });

  dialogRef.afterClosed().subscribe((confirmado: boolean) => {

    if (!confirmado) return;

    this.alunoService.deletar(id).subscribe({

      next: () => {

        // 🔥 remove direto do dataSource
        this.dataSource.data = this.dataSource.data.filter(
          (a: Aluno) => a.id !== id
        );

        this.snack.open('Aluno excluído com sucesso ✅', 'OK', {
          duration: 2500
        });

      },

      error: () => {
        this.snack.open('Erro ao excluir aluno', 'Fechar', {
          duration: 3000
        });
      }

    });

  });

}

}

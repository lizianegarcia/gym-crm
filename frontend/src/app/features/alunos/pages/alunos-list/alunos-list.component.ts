import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
import { Pagamento } from '../../../../core/models/pagamento.model';

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

  alunos: Aluno[] = [];
  alunosFiltrados: Aluno[] = [];
  pagamentos: Pagamento[] = [];

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
  }

  carregarDados() {

    this.alunoService.listar().subscribe(alunos => {

      this.pagamentoService.listar().subscribe(pagamentos => {

        this.pagamentos = pagamentos;

        this.alunos = alunos.map(aluno => ({
          ...aluno,
          statusFinanceiro: this.getStatusFinanceiro(aluno.id!)
        }));

        this.alunosFiltrados = [...this.alunos];

      });

    });

  }

  getStatusFinanceiro(alunoId: number): string {

    const pagamentosAluno = this.pagamentos.filter(p => p.alunoId === alunoId);

    if (pagamentosAluno.length === 0) return 'SEM_PAGAMENTO';

    const temPagamento = pagamentosAluno.some(p => p.status === 'PAGO');

    return temPagamento ? 'EM_DIA' : 'INADIMPLENTE';
  }

  getStatusLabel(status: string): string {

    switch (status) {
      case 'EM_DIA': return '🟢 Em dia';
      case 'INADIMPLENTE': return '🔴 Inadimplente';
      default: return '⚪ Sem pagamentos';
    }

  }

  aplicarFiltro() {
    const f = this.filtro.toLowerCase();
    this.alunosFiltrados = this.alunos.filter(
      (a: any) => a.nome.toLowerCase().includes(f) || a.cpf.includes(f)
    );
  }

  registrarPagamento(alunoId: number) {
    this.router.navigate(['/pagamentos/novo', alunoId]);
  }

  excluir(id: number) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        titulo: 'Excluir aluno',
        mensagem: 'Deseja realmente excluir este aluno?',
        textoConfirmar: 'Excluir'
      }
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {

      if (!confirmado) return;

      this.alunoService.deletar(id).subscribe({

        next: () => {

          this.alunos = this.alunos.filter(a => a.id !== id);

          if (this.filtro.trim()) this.aplicarFiltro();
          else this.alunosFiltrados = [...this.alunos];

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

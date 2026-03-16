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
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

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
    MatIconModule,
    RouterModule,
    MatSnackBarModule,
    MatDialogModule,
  ]
})
export class AlunosListComponent implements OnInit {
  alunos: Aluno[] = [];
  alunosFiltrados: Aluno[] = [];
  filtro: string = '';
  colunas: string[] = ['nome', 'cpf', 'plano', 'acoes'];

  constructor(private alunoService: AlunoService, private snack: MatSnackBar, private dialog: MatDialog) {}

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

  excluir(id: number) {

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: {
      titulo: 'Excluir aluno',
      mensagem: 'Deseja realmente excluir este aluno? Esta ação não poderá ser desfeita.',
      textoConfirmar: 'Excluir'
    }
  });

  dialogRef.afterClosed().subscribe((confirmado: boolean) => {

    if (!confirmado) return;

    this.alunoService.deletar(id).subscribe({

      next: () => {

        this.alunos = this.alunos.filter(a => a.id !== id);

        if (this.filtro.trim()) {
          this.aplicarFiltro();
        } else {
          this.alunosFiltrados = [...this.alunos];
        }

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

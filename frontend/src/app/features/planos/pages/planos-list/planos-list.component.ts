
import { PlanoService } from '../../../../core/services/plano.service';
import { Plano } from '../../../../core/models/plano.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-planos-list',
  standalone: true,
  templateUrl: './planos-list.component.html',

  imports: [
    CommonModule,
    CurrencyPipe,

    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatButtonModule,
    MatIconModule,

    MatSnackBarModule,
    MatDialogModule,

    MatFormFieldModule,
    MatInputModule
  ]
})
export class PlanosListComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'valor', 'duracaoMeses', 'acoes'];

  dataSource = new MatTableDataSource<Plano>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private planoService: PlanoService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.planoService.listar().subscribe({
      next: (data) => {
        this.dataSource.data = data;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.snack.open('Erro ao carregar planos', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  aplicarFiltro(event: Event) {

    const filtro = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  novo() {
    this.router.navigate(['/planos/novo']);
  }

  editar(id: number) {
    this.router.navigate(['/planos', id]);
  }

  excluir(id: number) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        titulo: 'Excluir plano',
        mensagem: 'Deseja realmente excluir este plano?',
        textoConfirmar: 'Excluir'
      }
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {

      if (!confirmado) return;

      this.planoService.excluir(id).subscribe({

        next: () => {

          this.snack.open('Plano excluído com sucesso', 'OK', {
            duration: 2500
          });

          this.carregar();

        },

        error: () => {

          this.snack.open('Erro ao excluir plano', 'Fechar', {
            duration: 3000
          });

        }

      });

    });

  }

}

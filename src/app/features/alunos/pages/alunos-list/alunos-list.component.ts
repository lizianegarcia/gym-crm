import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlunoService } from '../../../../core/services/aluno.service';
import { Aluno } from '../../../../core/models/aluno.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alunos-list',
  templateUrl: './alunos-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ]
})
export class AlunosListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'plano', 'status', 'acoes'];
  alunos = new MatTableDataSource<Aluno>();

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.alunoService.listar().subscribe(data => this.alunos.data = data);
  }

  excluir(id?: number) {
    if (id && confirm('Deseja realmente excluir este aluno?')) {
      this.alunoService.excluir(id).subscribe(() => {
        this.alunos.data = this.alunos.data.filter(a => a.id !== id);
      });
    }
  }
}

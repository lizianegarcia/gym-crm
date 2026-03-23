import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AlunoService } from '../../../../core/services/aluno.service';
import { Aluno } from '../../../../core/models/aluno.model';

import { PlanoService } from '../../../../core/services/plano.service';
import { Plano } from '../../../../core/models/plano.model';

import { PhoneMaskDirective } from '../../../../shared/directives/phone-mask.directive';
import { CpfMaskDirective } from '../../../../shared/directives/cpf-mask.directive';

@Component({
  selector: 'app-alunos-form',
  standalone: true,
  templateUrl: './alunos-form.component.html',

  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,

    MatSnackBarModule,

    PhoneMaskDirective,
    CpfMaskDirective
  ]
})
export class AlunosFormComponent implements OnInit {

  alunoId?: number;
  form!: FormGroup;
  planos: Plano[] = [];

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private planoService: PlanoService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {

    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: [''],
      email: [''],
      planoId: [null, Validators.required],
      status: ['ATIVO'],
      dataInicio: [new Date().toISOString().substring(0,10), Validators.required]
    });

    this.carregarPlanos();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.alunoId = Number(id);
      this.carregarAluno();
    }

  }

  carregarPlanos() {
    this.planoService.listar().subscribe(planos => {
      this.planos = planos;
    });
  }

  carregarAluno() {

    if (!this.alunoId) return;

    this.alunoService.buscarPorId(this.alunoId).subscribe(aluno => {
      this.form.patchValue(aluno);
    });

  }

  salvar() {

  if (this.form.invalid) return;

  const formValue = this.form.value;

  const aluno: any = {
    ...formValue,
    planoId: Number(formValue.planoId),
    dataInicio: new Date(formValue.dataInicio).toISOString()
  };

  if (this.alunoId) {

    aluno.id = this.alunoId;

    this.alunoService.atualizar(aluno).subscribe({

      next: () => {
        this.snack.open('Aluno atualizado com sucesso ✅', 'OK', {
          duration: 2500
        });

        this.router.navigate(['/alunos']);
      },

      error: (err) => {
        this.snack.open(err.error?.error || 'Erro ao atualizar aluno', 'Fechar', {
          duration: 3000
        });
      }

    });

  } else {

    this.alunoService.criar(aluno).subscribe({

      next: () => {
        this.snack.open('Aluno criado com sucesso ✅', 'OK', {
          duration: 2500
        });

        this.router.navigate(['/alunos']);
      },

      error: (err) => {
        this.snack.open(err.error?.error || 'Erro ao criar aluno', 'Fechar', {
          duration: 3000
        });
      }

    });

  }

}
  cancelar() {
    this.router.navigate(['/alunos']);
  }

}

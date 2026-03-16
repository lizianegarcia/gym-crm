import { PlanoService } from '../../../../core/services/plano.service';
import { Plano } from '../../../../core/models/plano.model';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-planos-form',
  standalone: true,
  templateUrl: './planos-form.component.html',

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class PlanosFormComponent implements OnInit {

  planoId?: number;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private planoService: PlanoService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {

    this.form = this.fb.group({
      nome: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      duracaoMeses: [1, [Validators.required, Validators.min(1)]]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.planoId = Number(id);
      this.carregarPlano();
    }

  }

  carregarPlano() {

    if (!this.planoId) return;

    this.planoService.buscarPorId(this.planoId).subscribe({

      next: (plano) => {
        this.form.patchValue(plano);
      },

      error: () => {
        this.snack.open('Erro ao carregar plano', 'Fechar', {
          duration: 3000
        });
      }

    });

  }

  salvar() {

    if (this.form.invalid) return;

    const plano = this.form.value as Plano;

    if (this.planoId) {

      this.planoService.atualizar(this.planoId, plano).subscribe({

        next: () => {

          this.snack.open('Plano atualizado com sucesso', 'OK', {
            duration: 2500
          });

          this.router.navigate(['/planos']);

        }

      });

    } else {

      this.planoService.criar(plano).subscribe({

        next: () => {

          this.snack.open('Plano criado com sucesso', 'OK', {
            duration: 2500
          });

          this.router.navigate(['/planos']);

        }

      });

    }

  }

  cancelar() {
    this.router.navigate(['/planos']);
  }

}

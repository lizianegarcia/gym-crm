import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { PagamentoService } from '../../../../core/services/pagamento.service';
import { Pagamento } from '../../../../core/models/pagamento.model';

@Component({
  selector: 'app-pagamentos-form',
  standalone: true,
  templateUrl: './pagamentos-form.component.html',

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
export class PagamentosFormComponent implements OnInit {

  form!: FormGroup;
  alunoId!: number;

  constructor(
    private fb: FormBuilder,
    private pagamentoService: PagamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {

    this.alunoId = Number(this.route.snapshot.paramMap.get('alunoId'));

    this.form = this.fb.group({
      valor: [0, [Validators.required, Validators.min(0)]],
      data: [new Date().toISOString().substring(0,10), Validators.required],
      status: ['PAGO', Validators.required]
    });

  }

  salvar() {

    if (this.form.invalid) return;

    const pagamento: Pagamento = {
      ...this.form.value,
      alunoId: this.alunoId
    };

    this.pagamentoService.criar(pagamento).subscribe({

      next: () => {

        this.snack.open('Pagamento registrado com sucesso 💰', 'OK', {
          duration: 2500
        });

        this.router.navigate(['/pagamentos']);

      },

      error: () => {
        this.snack.open('Erro ao registrar pagamento', 'Fechar');
      }

    });

  }

  cancelar() {
    this.router.navigate(['/pagamentos']);
  }

}

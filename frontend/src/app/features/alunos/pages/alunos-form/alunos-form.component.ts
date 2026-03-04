import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AlunoService } from '../../../../core/services/aluno.service';
import { Aluno } from '../../../../core/models/aluno.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class AlunosFormComponent implements OnInit {
  form!: FormGroup;
  alunoId?: number;

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: [''],
      email: ['', Validators.email],
      plano: ['', Validators.required],
      status: ['ATIVO']
    });

    this.alunoId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.alunoId){
      this.alunoService.buscarPorId(this.alunoId).subscribe(aluno => this.form.patchValue(aluno));
    }
  }

  salvar(){
    const aluno: Aluno = {
      ...this.form.value,
      id: this.alunoId
    };

    if(this.alunoId){
      this.alunoService.atualizar(aluno).subscribe(()=> this.router.navigate(['/alunos']));
    } else {
      this.alunoService.criar(aluno).subscribe(()=> this.router.navigate(['/alunos']));
    }
  }
}

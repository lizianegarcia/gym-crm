import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

import { LayoutComponent } from './layout/layout.component';

import { LoginComponent } from './features/auth/pages/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

import { AlunosListComponent } from './features/alunos/pages/alunos-list/alunos-list.component';
import { AlunosFormComponent } from './features/alunos/pages/alunos-form/alunos-form.component';

import { PlanosListComponent } from './features/planos/pages/planos-list/planos-list.component';
import { PlanosFormComponent } from './features/planos/pages/planos-form/planos-form.component';
import { PagamentosListComponent } from './features/pagamentos/pages/pagamentos-list/pagamentos-list.component';
import { PagamentosFormComponent } from './features/pagamentos/pages/pagamentos-form/pagamentos-form.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [

      {
        path: '',
        component: DashboardComponent
      },

      // ALUNOS

      {
        path: 'alunos',
        component: AlunosListComponent
      },
      {
        path: 'alunos/novo',
        component: AlunosFormComponent
      },
      {
        path: 'alunos/:id',
        component: AlunosFormComponent
      },

      // PLANOS

      {
        path: 'planos',
        component: PlanosListComponent
      },
      {
        path: 'planos/novo',
        component: PlanosFormComponent
      },
      {
        path: 'planos/:id',
        component: PlanosFormComponent
      },

      {
        path: 'pagamentos',
        component: PagamentosListComponent
      },

      {
        path: 'pagamentos/novo/:alunoId',
        component: PagamentosFormComponent
      },



    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];

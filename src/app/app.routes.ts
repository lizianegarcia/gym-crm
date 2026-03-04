import { Routes } from '@angular/router';
import { AlunosListComponent } from './features/alunos/pages/alunos-list/alunos-list.component';
import { AlunosFormComponent } from './features/alunos/pages/alunos-form/alunos-form.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'alunos', component: AlunosListComponent },
  { path: 'alunos/novo', component: AlunosFormComponent },
  { path: 'alunos/:id', component: AlunosFormComponent },
  { path: '**', redirectTo: '/alunos' }
];

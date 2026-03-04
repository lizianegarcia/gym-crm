export interface Aluno {
  id?: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  plano: string;
  status: 'ATIVO' | 'INATIVO' | 'INADIMPLENTE';
}

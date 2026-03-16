export interface Plano {
  id: number;
  nome: string;
  valor: number;
  duracaoMeses: number;
}

export interface Aluno {
  id?: number;
  nome: string;
  cpf: string;
  telefone?: string;
  email?: string;
  status: string;

  planoId: number;
  plano?: Plano; // vem do backend no GET /alunos
}

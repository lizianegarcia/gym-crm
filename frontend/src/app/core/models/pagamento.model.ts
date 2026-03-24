export interface Pagamento {
  id?: number;
  valor: number;
  data: string;
  status: string;
  alunoId: number;
}

export interface CriarPagamentoDTO {
  valor: number;
  alunoId: number;
}

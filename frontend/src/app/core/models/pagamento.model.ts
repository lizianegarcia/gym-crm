export interface Pagamento {
  id?: number;
  valor: number;
  data: string;
  status: 'PAGO' | 'PENDENTE';
  alunoId: number;
}

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {

    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

    const alunos = await prisma.aluno.findMany({
      include: { plano: true }
    });

    let alunosAtivos = 0;
    let inadimplentes = 0;
    let faturamento = 0;
    let novosAlunos = 0;

    alunos.forEach(aluno => {

      const vencimento = aluno.dataVencimento;
      const inicio = aluno.dataInicio;
      const valor = aluno.plano?.valor || 0;

      if (vencimento && vencimento >= hoje) {
        alunosAtivos++;
        faturamento += valor;
      }

      if (vencimento && vencimento < hoje) {
        inadimplentes++;
      }

      if (inicio && inicio >= inicioMes) {
        novosAlunos++;
      }

    });

    res.json({
      alunosAtivos,
      inadimplentes,
      faturamento,
      novosAlunos
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar dashboard' });
  }
});

export default router;
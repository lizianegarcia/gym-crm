import { Router } from "express";
import { prisma } from "../../config/database";

const pagamentosRoutes = Router();

// GET /pagamentos
pagamentosRoutes.get("/", async (req, res) => {
  try {

    const pagamentos = await prisma.pagamento.findMany({
      include: {
        aluno: true
      },
      orderBy: {
        data: "desc"
      }
    });

    res.json(pagamentos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar pagamentos" });
  }
});

// POST /pagamentos
pagamentosRoutes.post("/", async (req, res) => {
  try {

    const { valor, alunoId } = req.body;

    if (!valor || !alunoId) {
      return res.status(400).json({
        error: "valor e alunoId são obrigatórios"
      });
    }

    // 🔍 busca aluno com plano
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(alunoId) },
      include: { plano: true }
    });

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    // 🔥 cria pagamento
    const pagamento = await prisma.pagamento.create({
      data: {
        valor: Number(valor),
        alunoId: Number(alunoId),
      },
    });

    // 🔥 calcular novo vencimento
    const hoje = new Date();

    // 🔥 TRATAMENTO CORRETO
    let base: Date;

    if (!aluno.dataVencimento) {
      // nunca teve pagamento
      base = hoje;
    } else if (new Date(aluno.dataVencimento) < hoje) {
      // já venceu
      base = hoje;
    } else {
      // ainda válido
      base = new Date(aluno.dataVencimento);
    }

    const novoVencimento = new Date(base);
    novoVencimento.setMonth(
      novoVencimento.getMonth() + aluno.plano.duracaoMeses
    );

    // 🔥 atualizar aluno
    await prisma.aluno.update({
      where: { id: aluno.id },
      data: {
        dataVencimento: novoVencimento
      }
    });

    res.status(201).json(pagamento);

  } catch (error) {
    console.error("Erro ao registrar pagamento:", error);
    res.status(500).json({ error: "Erro ao registrar pagamento" });
  }
});

export { pagamentosRoutes };
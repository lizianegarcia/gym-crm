import { Router } from "express";
import { prisma } from "../../config/database";

const alunosRoutes = Router();

// GET /alunos
alunosRoutes.get("/", async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const alunos = await prisma.aluno.findMany({
      where: {
        usuarioId: user.id, 
      },
      include: {
        plano: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.json(alunos);

  } catch (error) {
    console.error("Erro ao buscar alunos:", error);

    return res.status(500).json({
      error: "Erro ao buscar alunos",
    });
  }
});

// GET /alunos/:id
alunosRoutes.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const aluno = await prisma.aluno.findUnique({
    where: { id },
    include: { plano: true, pagamentos: true },
  });

  if (!aluno) {
    return res.status(404).json({ error: "Aluno não encontrado" });
  }

  res.json(aluno);
});

// POST /alunos
alunosRoutes.post("/", async (req, res) => {
  try {

    const {
      nome,
      cpf,
      telefone,
      email,
      status,
      planoId,
      dataInicio
    } = req.body;

    // 🔍 validação básica
    if (!nome || !cpf || !planoId || !dataInicio) {
      return res.status(400).json({
        error: "nome, cpf, planoId e dataInicio são obrigatórios"
      });
    }

    // 🔐 valida usuário
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const userId = user.id;

    // 🔍 valida data
    const inicio = new Date(dataInicio);

    if (isNaN(inicio.getTime())) {
      return res.status(400).json({ error: "dataInicio inválida" });
    }

    // 🔍 buscar plano
    const plano = await prisma.plano.findUnique({
      where: { id: Number(planoId) }
    });

    if (!plano) {
      return res.status(400).json({ error: "Plano não encontrado" });
    }

    // 🔥 calcular vencimento
    const vencimento = new Date(inicio);
    vencimento.setMonth(vencimento.getMonth() + plano.duracaoMeses);

    // 🚀 criar aluno
    const aluno = await prisma.aluno.create({
      data: {
        nome,
        cpf,
        telefone,
        email,
        status: status ?? "ATIVO",
        planoId: Number(planoId),
        usuarioId: Number(userId),

        dataInicio: inicio,
        dataVencimento: vencimento,
      },
    });

    return res.status(201).json(aluno);

  } catch (error: any) {

    // 🔥 tratamento de CPF duplicado
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "CPF já cadastrado"
      });
    }

    console.error("Erro ao criar aluno:", error);

    return res.status(500).json({
      error: "Erro interno ao criar aluno"
    });
  }
});

// PUT /alunos/:id
alunosRoutes.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const {
    nome,
    cpf,
    telefone,
    email,
    status,
    planoId,
    dataInicio
  } = req.body;

  // 🔥 buscar plano
  const plano = await prisma.plano.findUnique({
    where: { id: Number(planoId) }
  });

  if (!plano) {
    return res.status(400).json({ error: "Plano não encontrado" });
  }

  // 🔥 calcular vencimento
  const inicio = new Date(dataInicio);
  const vencimento = new Date(inicio);
  vencimento.setMonth(vencimento.getMonth() + plano.duracaoMeses);

  const aluno = await prisma.aluno.update({
    where: { id },
    data: {
      nome,
      cpf,
      telefone,
      email,
      status,
      planoId: Number(planoId),

      dataInicio: inicio,
      dataVencimento: vencimento,
    },
  });

  res.json(aluno);
});

// DELETE /alunos/:id
alunosRoutes.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.aluno.delete({
    where: { id }
  });

  res.status(204).send();
});

export { alunosRoutes };
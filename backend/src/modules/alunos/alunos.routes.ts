import { Router } from "express";
import { prisma } from "../../config/database";

const alunosRoutes = Router();

// GET /alunos
alunosRoutes.get("/", async (req, res) => {
  const alunos = await prisma.aluno.findMany({
    include: { plano: true },
    orderBy: { id: "desc" },
  });
  res.json(alunos);
});

// GET /alunos/:id
alunosRoutes.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const aluno = await prisma.aluno.findUnique({
    where: { id },
    include: { plano: true, pagamentos: true },
  });

  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
  res.json(aluno);
});

// POST /alunos
alunosRoutes.post("/", async (req, res) => {
  const { nome, cpf, telefone, email, status, planoId } = req.body;

  if (!nome || !cpf || !planoId) {
    return res.status(400).json({ error: "nome, cpf e planoId são obrigatórios" });
  }

  // pega usuário logado do token (middleware já coloca em req.user)
  const userId = (req as any).user.id;

  const aluno = await prisma.aluno.create({
    data: {
      nome,
      cpf,
      telefone,
      email,
      status: status ?? "ATIVO",
      planoId: Number(planoId),
      usuarioId: Number(userId),
    },
  });

  res.status(201).json(aluno);
});

// PUT /alunos/:id
alunosRoutes.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { nome, cpf, telefone, email, status, planoId } = req.body;

  const aluno = await prisma.aluno.update({
    where: { id },
    data: {
      nome,
      cpf,
      telefone,
      email,
      status,
      planoId: Number(planoId),
    },
  });

  res.json(aluno);
});

// DELETE /alunos/:id
alunosRoutes.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.aluno.delete({ where: { id } });
  res.status(204).send();
});

export { alunosRoutes };
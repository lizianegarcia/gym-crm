"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagamentosRoutes = void 0;
const express_1 = require("express");
const database_1 = require("../../config/database");
const pagamentosRoutes = (0, express_1.Router)();
exports.pagamentosRoutes = pagamentosRoutes;
// GET /pagamentos
pagamentosRoutes.get("/", async (req, res) => {
    try {
        const pagamentos = await database_1.prisma.pagamento.findMany({
            include: {
                aluno: true
            },
            orderBy: {
                data: "desc"
            }
        });
        res.json(pagamentos);
    }
    catch (error) {
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
        const aluno = await database_1.prisma.aluno.findUnique({
            where: { id: Number(alunoId) },
            include: { plano: true }
        });
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" });
        }
        // 🔥 cria pagamento
        const pagamento = await database_1.prisma.pagamento.create({
            data: {
                valor: Number(valor),
                alunoId: Number(alunoId),
            },
        });
        // 🔥 calcular novo vencimento
        const hoje = new Date();
        // 🔥 TRATAMENTO CORRETO
        let base;
        if (!aluno.dataVencimento) {
            // nunca teve pagamento
            base = hoje;
        }
        else if (new Date(aluno.dataVencimento) < hoje) {
            // já venceu
            base = hoje;
        }
        else {
            // ainda válido
            base = new Date(aluno.dataVencimento);
        }
        const novoVencimento = new Date(base);
        novoVencimento.setMonth(novoVencimento.getMonth() + aluno.plano.duracaoMeses);
        // 🔥 atualizar aluno
        await database_1.prisma.aluno.update({
            where: { id: aluno.id },
            data: {
                dataVencimento: novoVencimento
            }
        });
        res.status(201).json(pagamento);
    }
    catch (error) {
        console.error("Erro ao registrar pagamento:", error);
        res.status(500).json({ error: "Erro ao registrar pagamento" });
    }
});

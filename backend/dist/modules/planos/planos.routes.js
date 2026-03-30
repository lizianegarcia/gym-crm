"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planosRoutes = void 0;
const express_1 = require("express");
const database_1 = require("../../config/database");
const planosRoutes = (0, express_1.Router)();
exports.planosRoutes = planosRoutes;
// GET /planos
planosRoutes.get("/", async (req, res) => {
    const planos = await database_1.prisma.plano.findMany({
        orderBy: { id: "asc" },
    });
    return res.json(planos);
});
// GET /planos/:id
planosRoutes.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const plano = await database_1.prisma.plano.findUnique({
        where: { id },
    });
    if (!plano)
        return res.status(404).json({ error: "Plano não encontrado" });
    return res.json(plano);
});
// POST /planos
planosRoutes.post("/", async (req, res) => {
    const { nome, valor, duracaoMeses } = req.body;
    if (!nome || valor === undefined || duracaoMeses === undefined) {
        return res.status(400).json({
            error: "nome, valor e duracaoMeses são obrigatórios",
        });
    }
    const plano = await database_1.prisma.plano.create({
        data: {
            nome,
            valor: Number(valor),
            duracaoMeses: Number(duracaoMeses),
        },
    });
    return res.status(201).json(plano);
});
// PUT /planos/:id
planosRoutes.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { nome, valor, duracaoMeses } = req.body;
    const plano = await database_1.prisma.plano.update({
        where: { id },
        data: {
            nome,
            valor: valor === undefined ? undefined : Number(valor),
            duracaoMeses: duracaoMeses === undefined ? undefined : Number(duracaoMeses),
        },
    });
    return res.json(plano);
});
// DELETE /planos/:id
planosRoutes.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    await database_1.prisma.plano.delete({
        where: { id },
    });
    return res.status(204).send();
});

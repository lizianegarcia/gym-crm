"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const usuario_service_1 = require("./usuario.service");
const service = new usuario_service_1.UsuarioService();
class UsuarioController {
    async register(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const usuario = await service.register(nome, email, senha);
            res.status(201).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: "Erro ao registrar usuário" });
        }
    }
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const result = await service.login(email, senha);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: "Credenciais inválidas" });
        }
    }
}
exports.UsuarioController = UsuarioController;

import { Request, Response } from "express";
import { UsuarioService } from "./usuario.service";

const service = new UsuarioService();

export class UsuarioController {
  async register(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;
      const usuario = await service.register(nome, email, senha);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: "Erro ao registrar usuário" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const result = await service.login(email, senha);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Credenciais inválidas" });
    }
  }
}
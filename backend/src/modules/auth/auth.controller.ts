import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const authService = new AuthService();
      const result = await authService.login({ email, senha });

      return res.json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          error: "refreshToken é obrigatório",
        });
      }

      const authService = new AuthService();
      const result = await authService.refresh(refreshToken);

      return res.json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }

  async logout(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const authService = new AuthService();
    const result = await authService.logout(userId);
    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
}
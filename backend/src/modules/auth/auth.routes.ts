import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const authRoutes = Router();
const authController = new AuthController();

// 🔓 públicas
authRoutes.post("/login", (req, res) =>
  authController.login(req, res)
);

authRoutes.post("/register", (req, res) =>
  authController.register(req, res)
);

authRoutes.post("/refresh", (req, res) =>
  authController.refresh(req, res)
);

// 🔒 protegida
authRoutes.post("/logout", authMiddleware, (req, res) =>
  authController.logout(req, res)
);

export { authRoutes };
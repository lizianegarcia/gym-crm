import { Router } from "express";
import { UsuarioController } from "./usuario.controller";

const router = Router();
const controller = new UsuarioController();

router.post("/register", controller.register);
router.post("/login", controller.login);

export { router as usuarioRoutes };
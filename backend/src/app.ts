import express from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.routes";
import { authMiddleware } from "./middlewares/auth.middleware";

import { alunosRoutes } from "./modules/alunos/alunos.routes";
import { planosRoutes } from "./modules/planos/planos.routes";
import { pagamentosRoutes } from "./modules/pagamentos/pagamentos.routes";
import dashboardRoutes from './modules/dashboard/dashboard.routes';

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Gym CRM API rodando 🚀" });
});

/** PÚBLICO */
app.use("/auth", authRoutes);

/** TUDO ABAIXO DISSO EXIGE TOKEN */
app.use(authMiddleware);

app.use("/alunos", alunosRoutes);
app.use("/planos", planosRoutes);
app.use("/pagamentos", pagamentosRoutes);
app.use('/dashboard', dashboardRoutes);

export { app };
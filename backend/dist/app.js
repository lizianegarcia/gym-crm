"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const alunos_routes_1 = require("./modules/alunos/alunos.routes");
const planos_routes_1 = require("./modules/planos/planos.routes");
const pagamentos_routes_1 = require("./modules/pagamentos/pagamentos.routes");
const dashboard_routes_1 = __importDefault(require("./modules/dashboard/dashboard.routes"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: "http://localhost:4200",
    credentials: true,
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "Gym CRM API rodando 🚀" });
});
/** PÚBLICO */
app.use("/auth", auth_routes_1.authRoutes);
/** TUDO ABAIXO DISSO EXIGE TOKEN */
app.use(auth_middleware_1.authMiddleware);
app.use("/alunos", alunos_routes_1.alunosRoutes);
app.use("/planos", planos_routes_1.planosRoutes);
app.use("/pagamentos", pagamentos_routes_1.pagamentosRoutes);
app.use('/dashboard', dashboard_routes_1.default);

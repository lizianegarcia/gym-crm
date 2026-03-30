"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = require("../../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    async login({ email, senha }) {
        const usuario = await database_1.prisma.usuario.findUnique({
            where: { email },
        });
        if (!usuario)
            throw new Error("Usuário ou senha inválidos");
        const senhaValida = await bcrypt_1.default.compare(senha, usuario.senha);
        if (!senhaValida)
            throw new Error("Usuário ou senha inválidos");
        // ✅ Access token curto
        const accessToken = jsonwebtoken_1.default.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
        // ✅ Refresh token longo
        const refreshToken = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        // ✅ Salva refresh no banco (permite revogar depois)
        await database_1.prisma.usuario.update({
            where: { id: usuario.id },
            data: { refreshToken },
        });
        return {
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role,
            },
            accessToken,
            refreshToken,
        };
    }
    async refresh(refreshToken) {
        if (!refreshToken)
            throw new Error("Refresh token não fornecido");
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const usuario = await database_1.prisma.usuario.findUnique({
            where: { id: decoded.id },
        });
        if (!usuario || usuario.refreshToken !== refreshToken) {
            throw new Error("Refresh token inválido");
        }
        const newAccessToken = jsonwebtoken_1.default.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
        return { accessToken: newAccessToken };
    }
    async logout(userId) {
        await database_1.prisma.usuario.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
        return { message: "Logout realizado com sucesso" };
    }
}
exports.AuthService = AuthService;

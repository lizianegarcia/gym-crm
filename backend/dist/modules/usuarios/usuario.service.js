"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const database_1 = require("../../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UsuarioService {
    async register(nome, email, senha) {
        const senhaHash = await bcrypt_1.default.hash(senha, 10);
        const usuario = await database_1.prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaHash,
            },
        });
        return usuario;
    }
    async login(email, senha) {
        const usuario = await database_1.prisma.usuario.findUnique({
            where: { email },
        });
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }
        const senhaValida = await bcrypt_1.default.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error("Senha inválida");
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { usuario, token };
    }
}
exports.UsuarioService = UsuarioService;

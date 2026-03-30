"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const senhaHash = await bcrypt_1.default.hash("123456", 10);
    // Admin
    await prisma.usuario.create({
        data: {
            nome: "Admin",
            email: "lizianegarciaa@gmail.com",
            senha: senhaHash,
            role: "ADMIN"
        }
    });
    // Planos
    await prisma.plano.createMany({
        data: [
            { nome: "Mensal", valor: 120, duracaoMeses: 1 },
            { nome: "Trimestral", valor: 300, duracaoMeses: 3 },
            { nome: "Anual", valor: 1000, duracaoMeses: 12 }
        ]
    });
    console.log("Seed executado com sucesso 🌱");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});

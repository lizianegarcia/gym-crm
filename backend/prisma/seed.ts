import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

  const senhaHash = await bcrypt.hash("123456", 10);

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
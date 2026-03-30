import { prisma } from "../../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginDTO {
  email: string;
  senha: string;
}

export class AuthService {
  async login({ email, senha }: LoginDTO) {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) throw new Error("Usuário ou senha inválidos");

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) throw new Error("Usuário ou senha inválidos");

    // ✅ Access token curto
    const accessToken = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    // ✅ Refresh token longo
    const refreshToken = jwt.sign(
      { id: usuario.id },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );

    // ✅ Salva refresh no banco (permite revogar depois)
    await prisma.usuario.update({
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

  async refresh(refreshToken: string) {
    if (!refreshToken) throw new Error("Refresh token não fornecido");

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as { id: number };

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.id },
    });

    if (!usuario || usuario.refreshToken !== refreshToken) {
      throw new Error("Refresh token inválido");
    }

    const newAccessToken = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    return { accessToken: newAccessToken };
  }

  async logout(userId: number) {
  await prisma.usuario.update({
    where: { id: userId },
    data: { refreshToken: null },
  });

  return { message: "Logout realizado com sucesso" };
}

async register({ email, senha }: { email: string; senha: string }) {
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    throw new Error("Usuário já existe");
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: {
      email,
      senha: senhaHash,
      nome: "Admin",
      role: "ADMIN",
    },
  });

  return {
    id: usuario.id,
    email: usuario.email,
  };
}
}
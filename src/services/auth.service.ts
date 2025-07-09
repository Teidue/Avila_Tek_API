// src/services/auth.service.ts
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterDto, LoginDto } from "../dtos/auth.dto";

export class AuthService {
  async register(data: RegisterDto) {
    if (!data.name || !data.email || !data.password) {
      throw { status: 400, message: "Todos los campos son requeridos" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) throw new Error("El correo ya está registrado.");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      message: "Usuario registrado correctamente.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }

  async login(data: LoginDto) {
    if (!data.email || !data.password) {
      throw { status: 400, message: "Email y contraseña requeridos" };
    }

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new Error("Usuario no encontrado.");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta.");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return {
      message: "Sesión iniciada exitosamente.",
      token,
    };
  }
}

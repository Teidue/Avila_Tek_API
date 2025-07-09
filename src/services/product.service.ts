import { prisma } from "../config/prisma";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";

export class ProductService {
  async create(data: CreateProductDto) {
    if (!data.name || !data.description || data.price <= 0 || data.stock < 0) {
      throw {
        status: 400,
        message:
          "Datos inválidos del producto: todos los campos son obligatorios, precio debe ser mayor a 0 y stock no puede ser negativo",
      };
    }
    return prisma.product.create({ data });
  }

  async update(id: string, data: UpdateProductDto) {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw { status: 404, message: "Producto no encontrado" };
    }

    // Validar campos opcionales si están presentes
    if (data.price !== undefined && data.price <= 0) {
      throw { status: 400, message: "El precio debe ser mayor a 0" };
    }

    if (data.stock !== undefined && data.stock < 0) {
      throw { status: 400, message: "El stock no puede ser negativo" };
    }

    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw { status: 404, message: "Producto no encontrado" };
    }

    return prisma.product.delete({ where: { id } });
  }

  async list(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [products, totalItems] = await Promise.all([
      prisma.product.findMany({
        where: { isActive: true }, // FILTRAR SOLO ACTIVOS
        skip,
        take: limit,
      }),
      prisma.product.count({
        where: { isActive: true }, // CONTAR SOLO ACTIVOS
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: products,
      page,
      totalPages,
      totalItems,
    };
  }

  async setAvailability(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw { status: 404, message: "Producto no encontrado" };
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        isActive: !product.isActive,
      },
    });

    return {
      message: `Producto ${
        updated.isActive ? "activado" : "desactivado"
      } correctamente.`,
      product: updated,
    };
  }
}

import { prisma } from "../config/prisma";
import { CreateOrderDto } from "../dtos/order.dto";

export class OrderService {
  async create(userId: string, dto: CreateOrderDto) {
    if (!dto.items || dto.items.length === 0) {
      throw {
        status: 400,
        message: "Debes incluir al menos un producto en la orden",
      };
    }

    for (const item of dto.items) {
      if (item.quantity <= 0) {
        throw {
          status: 400,
          message: `Cantidad inválida para producto: ${item.productId}`,
        };
      }

      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw {
          status: 404,
          message: `Producto no encontrado: ${item.productId}`,
        };
      }

      if (product.stock < item.quantity) {
        throw {
          status: 400,
          message: `Stock insuficiente para el producto "${product.name}"`,
        };
      }
    }

    return prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          items: {
            create: dto.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      });

      for (const item of dto.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return order;
    });
  }

  async listByUser(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const orders = await prisma.order.findMany({
      where: { userId },
      skip,
      take: limit,
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    const total = await prisma.order.count({ where: { userId } });

    return {
      data: orders,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    };
  }
}

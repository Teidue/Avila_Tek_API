import { SwaggerOptions } from "swagger-ui-express";

export const swaggerDocument: SwaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "Avila Tek API",
    version: "1.0.0",
    description: "Documentación de la API para la prueba técnica",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Registrar nuevo usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["name", "email", "password"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Usuario creado exitosamente",
          },
          400: {
            description: "Error de validación",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Iniciar sesión",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Sesión iniciada exitosamente",
          },
          401: {
            description: "Credenciales inválidas",
          },
        },
      },
    },
    "/products": {
      get: {
        tags: ["Products"],
        summary: "Listar productos paginados",
        parameters: [
          {
            name: "page",
            in: "query",
            description: "Número de página",
            required: false,
            schema: { type: "integer", default: 1 },
          },
          {
            name: "limit",
            in: "query",
            description: "Cantidad de productos por página",
            required: false,
            schema: { type: "integer", default: 10 },
          },
        ],
        responses: {
          200: {
            description: "Lista paginada de productos",
          },
        },
      },
      post: {
        tags: ["Products"],
        summary: "Crear nuevo producto",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  price: { type: "number" },
                  stock: { type: "number" },
                },
                required: ["name", "description", "price", "stock"],
              },
            },
          },
        },
        responses: {
          201: { description: "Producto creado" },
          400: { description: "Datos inválidos" },
          401: { description: "No autorizado" },
        },
      },
    },
    "/products/{id}": {
      put: {
        tags: ["Products"],
        summary: "Actualizar producto por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  price: { type: "number" },
                  stock: { type: "number" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Producto actualizado" },
          404: { description: "Producto no encontrado" },
          401: { description: "No autorizado" },
        },
      },
      delete: {
        tags: ["Products"],
        summary: "Eliminar producto por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Producto eliminado" },
          404: { description: "Producto no encontrado" },
          401: { description: "No autorizado" },
        },
      },
    },
    "/orders": {
      post: {
        tags: ["Orders"],
        summary: "Crear una orden",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        productId: { type: "string" },
                        quantity: { type: "integer", minimum: 1 },
                      },
                      required: ["productId", "quantity"],
                    },
                  },
                },
                required: ["items"],
              },
            },
          },
        },
        responses: {
          201: { description: "Orden creada exitosamente" },
          400: { description: "Datos inválidos o stock insuficiente" },
          401: { description: "No autenticado" },
        },
      },
    },
    "/orders/me": {
      get: {
        tags: ["Orders"],
        summary: "Obtener órdenes del usuario autenticado (paginado)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            description: "Número de página",
            required: false,
            schema: { type: "integer", default: 1 },
          },
          {
            name: "limit",
            in: "query",
            description: "Cantidad de órdenes por página",
            required: false,
            schema: { type: "integer", default: 10 },
          },
        ],
        responses: {
          200: {
            description: "Lista de órdenes paginadas",
          },
          401: {
            description: "No autenticado",
          },
        },
      },
    },
  },
};

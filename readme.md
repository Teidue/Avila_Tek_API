# Prueba Técnica Backend – Ávila Tek

## 🧠 Tecnologías usadas
- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- Swagger (OpenAPI)

## 🚀 Funcionalidades implementadas

- Registro e inicio de sesión de usuarios
- Autenticación JWT con middleware
- CRUD completo de productos (protegido)
- Procesamiento de pedidos con control de stock y transacciones
- Paginación en listados
- Validaciones y manejo de errores
- Documentación completa con Swagger en `/docs`

## 🔐 Endpoints principales

- `POST /auth/register`
- `POST /auth/login`
- `GET /products?page=[pageNumber]&limit=[limitNumber]`
- `POST/PUT/DELETE /products`
- `POST /orders`
- `GET /orders/me`

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/AvilaTek_API.git
cd AvilaTek_API
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

## 📃 Ruta principal de API documentada con SWAGGER UI

- http://localhost:3000/docs

## 🧠 Aclaración sobre el punto 3b: "Administrar el historial de pedidos"

El enunciado solicita:

> “Implemente endpoints para administrar el historial de pedidos de cada usuario.”

Tras un análisis semántico y funcional del término “administrar”, se concluyó que el propósito principal es **permitir al usuario autenticado consultar su historial personal de pedidos**. Esta interpretación se basa en que:

- El punto 3a ya cubre la creación de pedidos (POST /orders)
- El punto 3c detalla los datos que deben registrarse en cada pedido
- No se menciona editar, cancelar o eliminar pedidos
- “Historial” sugiere un registro inmutable de acciones pasadas

Por ello, se implementó el endpoint:

```http GET /orders/me```

El cual lista los pedidos del usuario autenticado, incluyendo detalles como productos, cantidades, estado y fecha. Esto cumple con el objetivo de administrar (es decir, consultar y gestionar visualmente) el historial personal del usuario dentro de un sistema de pedidos tipo ecommerce.

## 📌 Sobre el estado de los pedidos

Cada pedido se crea con un estado `"pending"` por defecto, tal como se refleja en el modelo `Order`.

El punto 3c del enunciado solicita capturar el estado del pedido como parte de los datos esenciales, pero **no especifica ningún flujo de actualización** de dicho estado.

Por esta razón, **no se implementó lógica para modificarlo**.


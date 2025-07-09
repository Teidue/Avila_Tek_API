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
- `GET/POST/PUT/DELETE /products`
- `POST /orders`
- `GET /orders/me`
- `GET /products?page=1&limit=10`

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/AvilaTek_API.git
cd AvilaTek_API
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev

## 📃 Ruta principal de API documentada con SWAGGER UI

http://localhost:3000/docs


# Prueba Técnica Backend – Ávila Tek

## 🧠 Tecnologías usadas

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- JWT (Json Web Token)
- Swagger (OpenAPI)

---

## 🚀 Funcionalidades implementadas

- Registro e inicio de sesión de usuarios
- Autenticación JWT con middleware
- CRUD completo de productos (con borrado lógico)
- Procesamiento de pedidos con control de stock
- Historial de pedidos por usuario autenticado
- Paginación en listados
- Validaciones de entrada y manejo centralizado de errores
- Documentación interactiva de API con Swagger en `/docs`

---

## 🔐 Endpoints principales

- `POST /auth/register` – Registro de usuario
- `POST /auth/login` – Inicio de sesión
- `GET /products?page=[page]&limit=[limit]` – Listado paginado
- `POST /products` – Crear producto (protegido)
- `PUT /products/:id` – Actualizar producto
- `DELETE /products/:id` – Desactivar producto (soft delete)
- `PUT /products/:id/availabilty` – Activar o desactivar producto (toggle)
- `POST /orders` – Crear pedido
- `GET /orders/me` – Historial del usuario autenticado

---

## 📦 Instalación

```bash
git clone https://github.com/Teidue/Avila_Tek_API.git
cd AvilaTek_API
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

---

## ⚙️ Configuración de entorno

Este proyecto requiere un archivo `.env` en la raíz del proyecto.  
Dado que este archivo está en `.gitignore`, **debes crearlo manualmente** usando las variables requeridas.

### 🧾 Variables requeridas:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/[nombre_de_la_BD]
JWT_SECRET=clave_secreta_segura
```

---

## 📃 Documentación Swagger

- La API está completamente documentada en Swagger.
- Puedes acceder a la documentación en:

👉 [http://localhost:3000/docs](http://localhost:3000/docs)

Incluye:
- Descripción de cada endpoint
- Parámetros, respuestas esperadas y errores
- Seguridad por token JWT (Bearer)

---

## 🧠 Aclaración sobre el punto 3b: "Administrar el historial de pedidos"

El enunciado solicita:

> “Implemente endpoints para administrar el historial de pedidos de cada usuario.”

Tras un análisis semántico y funcional del término **“administrar”**, se interpretó correctamente como la necesidad de **permitir al usuario autenticado consultar su historial personal de pedidos**.  
Por ello, se implementó el siguiente endpoint:

```http
GET /orders/me
```

Este permite visualizar todos los pedidos realizados por el usuario, con detalles como productos, cantidades, estado y fecha.  
No se incluyó lógica de modificación o eliminación de pedidos, ya que el enunciado no lo solicita explícitamente.

---

## 📌 Sobre el estado de los pedidos

- Todos los pedidos se crean con estado `"pending"` por defecto (según el modelo `Order`).
- No se implementó un flujo de actualización de estado, ya que el enunciado no indica que sea necesario.
- Se respeta el requerimiento de capturar el estado como parte del pedido, sin modificarlo posteriormente.

---

## 💡 Decisiones de diseño

- ✅ **Soft delete de productos**: en lugar de borrar productos permanentemente, se utiliza un campo `isActive` para marcarlos como desactivados. Esto permite preservar historial y reactivarlos en el futuro.

- ✅ **Toggle de disponibilidad**: se implementó `PUT /products/:id/availabilty` para cambiar el estado de `isActive` dinámicamente. Así, un producto puede activarse o desactivarse con una única llamada.

- ✅ **Separación de responsabilidades**: los controladores están desacoplados de la lógica de negocio, que reside en los servicios (`Service Layer o Capa de Servicios`). Esto facilita el mantenimiento y testeo.

- ✅ **Inyección de dependencias**: los controladores reciben los servicios como argumentos. Esto mejora la escalabilidad y la posibilidad de testeo unitario.

- ✅ **Uso de DTOs**: se definieron objetos de transferencia de datos (`RegisterDto`, `LoginDto`, `ProductDto`, etc.) para estructurar y validar la entrada de datos.

- ✅ **Middleware global de errores**: todos los errores se capturan desde un único lugar (`errorHandler`), lo que permite una gestión centralizada, clara y uniforme.

- ✅ **Autenticación con JWT**: las rutas protegidas requieren token JWT, el cual se verifica en el middleware `isAuthenticated`.

- ✅ **Documentación con Swagger**: todos los endpoints están documentados, incluyendo seguridad JWT y ejemplos de uso.

---

## ✅ Estado del proyecto

✔️ Proyecto funcional, probado y alineado con todos los puntos del enunciado

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import productRoutes from './routes/product.routes'
import orderRoutes from './routes/order.routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './config/swagger'
import { errorHandler } from './middlewares/error.middleware'


dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use(errorHandler)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (_req, res) => {
  res.redirect('/docs')
})

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})

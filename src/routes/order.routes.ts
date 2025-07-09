import { Router } from 'express'
import { OrderService } from '../services/order.service'
import { createOrder, getMyOrders } from '../controllers/order.controller'
import { isAuthenticated } from '../middlewares/auth.middleware'

const router = Router()
const orderService = new OrderService()

// La interpretación razonada es que se refiere a consultar dicho historial
// No se incluyen acciones de modificación o eliminación de órdenes, ya que el enunciado
// no lo especifica ni lo sugiere en otros apartados.

router.post('/', isAuthenticated, createOrder(orderService))
router.get('/me', isAuthenticated, getMyOrders(orderService))

export default router

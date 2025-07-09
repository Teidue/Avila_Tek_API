import { Router } from 'express'
import { OrderService } from '../services/order.service'
import { createOrder, getMyOrders } from '../controllers/order.controller'
import { isAuthenticated } from '../middlewares/auth.middleware'

const router = Router()
const orderService = new OrderService()

router.post('/', isAuthenticated, createOrder(orderService))
router.get('/me', isAuthenticated, getMyOrders(orderService))

export default router

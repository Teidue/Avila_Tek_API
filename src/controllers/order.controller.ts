import { Request, Response, NextFunction } from 'express'
import { OrderService } from '../services/order.service'

interface AuthenticatedRequest extends Request {
  user?: any
}

export const createOrder = (service: OrderService) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await service.create(req.user.id, req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

export const getMyOrders = (service: OrderService) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 10

      if (page < 1 || limit < 1) {
        throw { status: 400, message: 'Los parámetros de paginación deben ser mayores a 0' }
      }

      const result = await service.listByUser(req.user.id, page, limit)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }


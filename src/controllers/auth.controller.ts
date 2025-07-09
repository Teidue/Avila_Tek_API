import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/auth.service'

export const registerUser = (authService: AuthService) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await authService.register(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

export const loginUser = (authService: AuthService) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await authService.login(req.body)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

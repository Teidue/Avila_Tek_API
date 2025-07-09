import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload
}

export const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token no proporcionado' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = decoded // puedes extender `Request` si quieres tipar `user`
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

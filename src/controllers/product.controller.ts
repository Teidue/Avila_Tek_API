import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";

export const listProducts =
  (service: ProductService) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      if (page < 1 || limit < 1) {
        throw {
          status: 400,
          message: "Los parámetros de paginación deben ser mayores a 0",
        };
      }

      const result = await service.list(page, limit);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

export const createProduct =
  (productService: ProductService) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const created = await productService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  };

export const updateProduct =
  (productService: ProductService) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updated = await productService.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };

export const deleteProduct =
  (productService: ProductService) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deleted = await productService.delete(req.params.id);
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  };

// src/routes/product.routes.ts
import { Router } from "express";
import { ProductService } from "../services/product.service";
import {
  listProducts,
  createProduct,
  updateProduct,
  setProductAvailability,
  deleteProduct,
} from "../controllers/product.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();
const productService = new ProductService();

router.get("/", listProducts(productService));
router.post("/", isAuthenticated, createProduct(productService));
router.put("/:id", isAuthenticated, updateProduct(productService));
router.delete("/:id", isAuthenticated, deleteProduct(productService));
//SOFT DELETE
router.put('/:id/availability', isAuthenticated, setProductAvailability(productService))


export default router;

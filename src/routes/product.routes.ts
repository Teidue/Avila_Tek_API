// src/routes/product.routes.ts
import { Router } from "express";
import { ProductService } from "../services/product.service";
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();
const productService = new ProductService();

router.get("/", listProducts(productService));
router.post("/", isAuthenticated, createProduct(productService));
router.put("/:id", isAuthenticated, updateProduct(productService));
router.delete("/:id", isAuthenticated, deleteProduct(productService));

export default router;

import { Router} from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

const router = Router();
const authService = new AuthService();

router.post("/register", registerUser(authService));
router.post("/login", loginUser(authService));

export default router;

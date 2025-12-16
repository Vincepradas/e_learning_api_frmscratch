import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const controller = new AuthController();

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password", controller.resetPassword);

export default router;

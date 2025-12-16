import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { requireAuth } from "../middleware/requireAuth";
import { canCreateUser } from "../middleware/authMiddleware";

const router = Router();
const controller = new UserController();

// -------- CREATE USERS --------

// Admin & Teacher only (with role rules)
router.post(
  "/",
  requireAuth,
  canCreateUser(),
  controller.create
);

// Convenience routes
router.post(
  "/students",
  requireAuth,
  canCreateUser(),
  controller.createStudent
);

router.post(
  "/instructors",
  requireAuth,
  canCreateUser(),
  controller.createInstructor
);

// -------- READ USERS --------

// Any authenticated user
router.get("/", requireAuth, controller.getAll);
router.get("/:id", requireAuth, controller.getById);

// -------- UPDATE / DELETE --------
// Admin only
router.put("/:id", requireAuth, controller.update);
router.delete("/:id", requireAuth, controller.delete);

export default router;

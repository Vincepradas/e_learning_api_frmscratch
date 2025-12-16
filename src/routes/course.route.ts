import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import { requireAuth } from "../middleware/requireAuth";
import { requireTeacherOrAdmin } from "../middleware/authMiddleware";

const router = Router();
const controller = new CourseController();

router.post(
    "/",
    requireAuth,
    requireTeacherOrAdmin(),
    controller.createCourse
)

export default router;
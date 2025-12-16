import { CourseService } from "../services/course.services";
import { Request, Response } from "express";
export class CourseController {
  private service = new CourseService();
  createCourse = async (req: Request, res: Response) => {
    try {
      const course = await this.service.createCourse(req.body);
      res.status(201).json({ message: "Course created successfully.", course});
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };
}

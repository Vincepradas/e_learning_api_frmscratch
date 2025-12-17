import { CourseService } from "../services/course.services";
import { Request, Response } from "express";
export class CourseController {
  private service = new CourseService();

  createCourse = async (req: Request, res: Response) => {
    try {
      const course = await this.service.createCourse(req.body);
      res.status(201).json({ message: "Course created successfully.", course });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  getAllCourse = async (req: Request, res: Response) => {
    try {
      const pageSize = Math.min(Number(req.query.pageSize) || 10, 100);
      const pageIndex = Math.max(Number(req.query.pageIndex) || 0, 0);
      const result = await this.service.getAll(
        pageIndex,
        pageSize,
        req.body.id
      );

      res.json({
        pageIndex,
        pageSize,
        totalCourses: result.total,
        totalPages: Math.ceil(result.total / pageSize),
        courses: result.course,
      });
    } catch (e: any) {
      console.error(e.message);
    }
  };

  getCourseByCode = async (req: Request, res: Response) => {
    try {
      const code = req.params.code;
      const courses = await this.service.getByCode(code);
      res.json(courses);
    } catch (e: any) {
      console.error(e.message);
      res.status(404).json({ error: e.message });
    }
  };
}

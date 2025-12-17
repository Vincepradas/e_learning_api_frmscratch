import { CourseRepository } from "../repositories/course.repository";
import { v4 as uuidv4 } from "uuid";

export class CourseService {
  constructor(private repo = new CourseRepository()) {}

  async createCourse(data: any) {
    const {
      code,
      title,
      description,
      startTime,
      endTime,
      days,
      room,
      type,
      units,
      block,
      semester,
      schoolYear,
      maxStudents,
      ...rest
    } = data;

    const missing: string[] = Object.entries({
      code,
      title,
      startTime,
      endTime,
      days,
      type,
      units,
      block,
      semester,
      schoolYear,
      maxStudents,
    })
      .filter(([, v]) => !v)
      .map(([k]) => k);

    if (missing.length) {
      throw new Error(`Missing required fields: ${missing.join(", ")}`);
    }

    if (await this.repo.isConflict(code, days, startTime, endTime)) {
      throw new Error(
        "Time conflict: another course with the same code overlaps on this day"
      );
    }

    const course = await this.repo.create({
      id: uuidv4(),
      code,
      title,
      description,
      startTime,
      endTime,
      days,
      room,
      type,
      units,
      block,
      semester,
      schoolYear,
      maxStudents,
      ...rest,
    });

    return course;
  }

  async getAll(pageIndex: number, pageSize: number, id: string) {
    const [course, total] = await Promise.all([
      this.repo.findAll(pageIndex, pageSize),
      this.repo.count(id),
    ]);

    return { course, total };
  }

  async getByCode(code: string) {
    const courses = await this.repo.findByCode(code);
    if (courses.length === 0) {
      throw new Error(`No course with code: ${code} found in our record.`);
    }
    return courses;
  }

  async updateCourse(id: any, data: any) {
    const course = await this.repo.update(id, data);
    return course;
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}

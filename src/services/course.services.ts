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
    const id = uuidv4();

    const course = await this.repo.create({
      id,
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

    return { ...course };
  }

  //   updateCourse();
  //   getCourse();
  //   deleteCourse();
  //   couseCompletionStatus();
}

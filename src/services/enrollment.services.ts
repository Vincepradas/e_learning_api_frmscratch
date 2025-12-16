import { EnrollmentRepository } from "../repositories/enrollment.repository";
import { v4 as uuidv4 } from "uuid";

export class EnrollmentService {
    constructor(private repo  = new EnrollmentRepository()) {};

    enroll(data: any) {
        const { userId, courseId, isVerified, status, ...rest } = data;
        if(!userId || courseId || !isVerified) {
            throw new Error("Enrollment not allowed, contact your instructor.");
        }
    };

    // manageEnrollment();
    // enrollmentAccessControl();
    // getEnrollment();
    // getEnrollmentHistory();
    // dropEnrollment();
}


/**
 * user course enrollment
 * status manager
 * access control
 * couse enrolled
 * enrollment history
 * drop course
 */

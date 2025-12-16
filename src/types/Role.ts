export enum RoleId {
  Student = 1,
  Teacher = 2,
  Admin = 3,
}

export const RoleMap: Record<RoleId, Role> = {
  [RoleId.Student]: "student",
  [RoleId.Teacher]: "teacher",
  [RoleId.Admin]: "admin",
};

export type Role = "student" | "teacher" | "admin";

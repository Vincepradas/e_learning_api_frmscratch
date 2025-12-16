import { RoleId, RoleMap } from "../types/User";

export type Role = "student" | "teacher" | "admin";

export function validateRole(role: string): role is Role {
  return ["student", "teacher", "admin"].includes(role);
}

export function validateRoleId(roleId: number): roleId is RoleId {
  return roleId in RoleMap;
}

export function getRoleIdFromRole(role: Role): RoleId {
  const entry = Object.entries(RoleMap).find(([, v]) => v === role);
  return Number(entry![0]) as RoleId;
}

export function resolveRole(
  role?: string,
  roleId?: number
): Role {
  if (role && validateRole(role)) return role;
  if (roleId && validateRoleId(roleId)) return RoleMap[roleId];
  return "student";
}

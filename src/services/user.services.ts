import { UserRepository } from "../repositories/user.repository";
import { hashPassword } from "../utils/password.util";
import { resolveRole, getRoleIdFromRole, Role } from "../utils/role.util";
import { RoleMap } from "../types/User";

export class UserService {
  constructor(private repo = new UserRepository()) {}

  async create(data: any) {
    const { name, email, password, phoneNumber, role, roleId, ...rest } = data;

    if (!name || !email || !password || !phoneNumber) {
      throw new Error("Missing required fields");
    }

    if (await this.repo.findByEmail(email)) {
      throw new Error("User already exists");
    }

    const userRole: Role = resolveRole(role, roleId);
    const hashedPassword = await hashPassword(password);

    const user = await this.repo.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role: userRole,
      ...rest,
    });

    return { ...user, role: getRoleIdFromRole(user.role) };
  }

  private mapRoleToId(user: any) {
    return {
      ...user,
      role: Object.entries(RoleMap).find(
        ([, value]) => value === user.role
      )?.[0]
        ? Number(
            Object.entries(RoleMap).find(([, value]) => value === user.role)![0]
          )
        : null,
    };
  }

  async getAll(pageIndex: number, pageSize: number, role?: string) {
    const [users, total] = await Promise.all([
      this.repo.findAll(pageIndex, pageSize, role),
      this.repo.count(role),
    ]);

    const mappedUsers = users.map((u) => this.mapRoleToId(u));

    return { users: mappedUsers, total };
  }

  async getById(id: number) {
    const user = await this.repo.findById(id);
    if (!user) throw new Error("User not found");

    return this.mapRoleToId(user);
  }

  async update(id: number, data: any) {
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    const user = await this.repo.update(id, data);
    return { ...user, role: getRoleIdFromRole(user.role) };
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}

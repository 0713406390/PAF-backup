export type Role = "USER" | "ADMIN" | "MANAGER" | "TECHNICIAN";

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  authenticated: boolean;
}

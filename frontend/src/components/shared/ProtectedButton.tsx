import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { Role } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";

interface ProtectedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  allowedRoles: Role[];
  children: ReactNode;
}

export default function ProtectedButton({ allowedRoles, children, ...buttonProps }: ProtectedButtonProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
}

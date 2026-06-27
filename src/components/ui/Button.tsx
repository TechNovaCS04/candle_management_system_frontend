import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-brand-hover text-text-inverse hover:bg-brand active:bg-brand-active shadow-sm",
  secondary:
    "bg-surface-muted text-text-body border border-border-strong hover:bg-surface-hover",
  ghost: "bg-transparent text-text-body hover:bg-surface-hover",
  danger: "bg-danger text-text-inverse hover:bg-danger-text",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2.5 text-sm gap-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  fullWidth,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

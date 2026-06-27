import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-bronze-500 text-cream-50 hover:bg-bronze-600 active:bg-bronze-700 shadow-sm",
  secondary:
    "bg-cream-100 text-bronze-800 border border-wax-200 hover:bg-wax-100",
  ghost: "bg-transparent text-bronze-700 hover:bg-wax-100",
  danger: "bg-ember-500 text-cream-50 hover:bg-ember-700",
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

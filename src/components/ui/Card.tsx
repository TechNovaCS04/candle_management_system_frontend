import type { HTMLAttributes, ReactNode } from "react";

export function Card({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`panel ${className}`} {...props}>
      {children}
    </div>
  );
}

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface-hover text-text-body",
  success: "bg-success-bg text-success-text",
  warning: "bg-warning-bg text-warning-text",
  danger: "bg-danger-bg text-danger-text",
  info: "bg-brand-subtle text-text-body",
};

export function Badge({
  tone = "neutral",
  children,
  icon,
}: {
  tone?: BadgeTone;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}

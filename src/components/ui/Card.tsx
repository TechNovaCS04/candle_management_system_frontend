import type { HTMLAttributes, ReactNode } from "react";

export function Card({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-cream-50 border border-wax-200 rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-wax-100 text-bronze-700",
  success: "bg-sage-100 text-sage-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-ember-100 text-ember-700",
  info: "bg-bronze-50 text-bronze-700",
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

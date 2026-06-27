import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "../../components/ui/Card";

export default function StatCard({
  label,
  value,
  icon,
  trend,
  trendLabel,
  accent = "bronze",
}: {
  label: string;
  value: string;
  icon: ReactNode;
  trend?: number;
  trendLabel?: string;
  accent?: "bronze" | "sage" | "ember" | "amber";
}) {
  const accentBg: Record<string, string> = {
    bronze: "bg-bronze-50 text-bronze-600",
    sage: "bg-sage-100 text-sage-700",
    ember: "bg-ember-100 text-ember-700",
    amber: "bg-amber-100 text-amber-700",
  };

  const isPositive = (trend ?? 0) >= 0;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-3">
        <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${accentBg[accent]}`}>
          {icon}
        </span>
        {trend !== undefined && (
          <span
            className={`flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded-full ${
              isPositive ? "bg-sage-100 text-sage-700" : "bg-ember-100 text-ember-700"
            }`}
          >
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold text-bronze-900 tabular leading-tight">{value}</p>
      <p className="text-sm text-bronze-500 mt-1">{label}</p>
      {trendLabel && <p className="text-xs text-bronze-400 mt-2">{trendLabel}</p>}
    </Card>
  );
}

import { cn } from "@/lib/utils";
import { ChevronDown, type LucideIcon } from "lucide-react";

export interface EntityCardProps {
  title: string;
  subtitle?: string;
  initials?: string;
  badge?: { 
    label: string; 
    color: string;
    options?: string[];
    onValueChange?: (val: string) => void;
  };
  meta?: { icon?: LucideIcon; label: string }[];
  actions?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/** Reusable entity card — used by Customers, Jobs, and more. */
export function EntityCard({ title, subtitle, initials, badge, meta, actions, className, onClick }: EntityCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
      "group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-accent/30",
      onClick && "cursor-pointer",
      className
    )}>
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {initials && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
              {initials}
            </span>
          )}
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {badge && (
          <div className="relative">
            {badge.options ? (
              <select
                className={cn(
                  "appearance-none cursor-pointer outline-none inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] sm:text-xs font-medium ring-1 ring-inset pr-5",
                  badge.color
                )}
                value={badge.label}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  badge.onValueChange?.(e.target.value);
                }}
              >
                {badge.options.map((opt) => (
                  <option key={opt} value={opt} className="text-foreground bg-background">{opt}</option>
                ))}
              </select>
            ) : (
              <span className={cn("inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset", badge.color)}>
                {badge.label}
              </span>
            )}
            {badge.options && (
              <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none opacity-60" />
            )}
          </div>
        )}
      </div>

      {/* Meta info row */}
      {meta && meta.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-border pt-3">
          {meta.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Optional action slot */}
      {actions && (
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {actions}
        </div>
      )}
    </div>
  );
}

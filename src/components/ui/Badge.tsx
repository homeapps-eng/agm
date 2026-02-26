import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "violet" | "gold" | "muted";
  className?: string;
}

export function Badge({ children, variant = "violet", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        {
          "bg-violet/10 text-violet": variant === "violet",
          "bg-gold/10 text-gold": variant === "gold",
          "bg-muted text-muted-foreground": variant === "muted",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

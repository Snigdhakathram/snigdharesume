
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  name: string;
  icon?: IconType | LucideIcon;
  className?: string;
  showIcon?: boolean;
}

export default function SkillCard({
  name,
  icon: Icon,
  className = "",
  showIcon = true,
}: SkillCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-2xl",
        "bg-card text-foreground",
        "border border-neutral-200",
        "hover:shadow-lg hover:border-neutral-300",
        "transition-all duration-300 ease-out cursor-default",
        "aspect-square",
        className
      )}
    >
      {Icon && showIcon && (
        <div className="mb-4 p-3 rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-600 transition-colors duration-300 group-hover:scale-110">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <span className="text-sm font-bold text-center text-foreground leading-tight">
        {name}
      </span>
    </div>
  );
}

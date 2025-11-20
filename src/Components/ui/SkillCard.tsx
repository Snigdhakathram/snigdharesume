
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import SpotlightCard from "@/Components/ui/SpotlightCard";

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
    <SpotlightCard
      className={cn(
        "p-2 md:p-4 rounded-2xl",
        "bg-white dark:bg-card text-foreground",
        "border-neutral-200",
        "transition-all duration-300 ease-out cursor-default",
        "aspect-square",
        className
      )}
      spotlightColor="rgba(var(--glow-color), var(--glow-opacity))"
    >
      <div className="flex flex-col items-center justify-center h-full w-full">
        {Icon && showIcon && (
          <div className="mb-4 h-10 w-10 md:h-14  md:w-14 flex items-center justify-center rounded-lg md:rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-600 transition-colors duration-300 group-hover:scale-110">
            <Icon className="md:w-8 md:h-8 w-5 h-5" />
          </div>
        )}
        <span className="text-[10px] md:text-sm font-bold text-center text-foreground leading-tight">
          {name}
        </span>
      </div>
    </SpotlightCard>
  );
}

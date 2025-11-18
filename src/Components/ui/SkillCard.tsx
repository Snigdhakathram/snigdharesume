import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

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
      className={`flex items-center gap-2 px-4 py-2 text-sm md:text-sm rounded-lg bg-neutral-100 text-foreground border-neutral-300 hover:border-neutral-400 transition-all duration-200 cursor-default ${className}`}
      spotlightColor="rgba(var(--foreground), 0.1)"
    >
      <div className="relative z-10 flex items-center gap-2">
        {Icon && showIcon && <Icon className="text-lg text-foreground" />}
        <span className="text-foreground font-medium">{name}</span>
      </div>
    </SpotlightCard>
  );
}

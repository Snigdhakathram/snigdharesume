import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

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
      className={`flex items-center gap-2 px-4 py-1.5 text-sm md:text-sm rounded-lg bg-neutral-100 text-foreground border border-neutral-300 ${className}`}
    >
      {Icon && showIcon && <Icon className="text-lg text-foreground" />}
      <span className="text-foreground">{name}</span>
    </div>
  );
}

import { LucideIcon, icons, CircleAlert } from "lucide-react";

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  className?: string;
  fallback?: keyof typeof icons;
}

const Icon = ({
  name,
  size = 24,
  className = "",
  fallback = "CircleAlert",
}: IconProps) => {
  const IconComponent: LucideIcon =
    icons[name] || icons[fallback] || CircleAlert;

  return <IconComponent size={size} className={className} />;
};

export default Icon;

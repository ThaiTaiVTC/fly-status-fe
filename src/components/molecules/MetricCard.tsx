import { Card, CardContent } from "@/components/atoms/Card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, AlertTriangle, Plane, Users, DollarSign, Clock, Wifi, Activity } from "lucide-react";

const iconMap = {
  plane: Plane,
  users: Users,
  dollar: DollarSign,
  clock: Clock,
  wifi: Wifi,
  activity: Activity,
};

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  subtitle: string;
  icon: keyof typeof iconMap;
  type: "increase" | "decrease" | "warning";
  className?: string;
}

export function MetricCard({ title, value, change, subtitle, icon, type, className }: MetricCardProps) {
  const IconComponent = iconMap[icon];

  const getIconBackground = (iconType: keyof typeof iconMap) => {
    switch (iconType) {
      case "plane":
        return "bg-blue-100";
      case "users":
        return "bg-cyan-100";
      case "dollar":
        return "bg-yellow-100";
      case "clock":
        return "bg-pink-100";
      case "wifi":
        return "bg-purple-100";
      case "activity":
        return "bg-green-100";
      default:
        return "bg-blue-100";
    }
  };

  const getIconColor = (iconType: keyof typeof iconMap) => {
    switch (iconType) {
      case "plane":
        return "text-blue-500";
      case "users":
        return "text-cyan-500";
      case "dollar":
        return "text-yellow-500";
      case "clock":
        return "text-pink-500";
      case "wifi":
        return "text-purple-500";
      case "activity":
        return "text-green-500";
      default:
        return "text-blue-500";
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case "increase":
        return "text-green-500";
      case "decrease":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "increase":
        return TrendingUp;
      case "decrease":
        return TrendingDown;
      case "warning":
        return AlertTriangle;
      default:
        return TrendingUp;
    }
  };

  const ChangeIconComponent = getChangeIcon(type);

  return (
    <div className={cn("p-2 sm:p-2.5 bg-gradient-to-br from-gray-100/60 to-gray-50/40 rounded-[1.5rem] sm:rounded-[1.75rem] h-full", className)}>
      <Card className="h-full bg-white shadow-md hover:shadow-xl transition-all duration-300 border-0 rounded-2xl sm:rounded-3xl overflow-hidden group hover:-translate-y-1">
        <CardContent className="p-4 sm:p-5 h-full flex flex-col">
          {/* Header row: title and icon */}
          <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide leading-tight flex-1">{title}</h3>
            <div
              className={cn(
                "w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
                getIconBackground(icon)
              )}
            >
              <IconComponent className={cn("h-5 w-5", getIconColor(icon))} />
            </div>
          </div>

          {/* Value */}
          <div className="mb-2 flex-grow">
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight break-words">{value}</div>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm font-medium text-gray-500 mt-auto">{subtitle}</p>

          {/* Change indicator */}
          {/* <div className={cn("flex items-center space-x-1 text-xs font-semibold mt-2", getChangeColor(type))}>
            <ChangeIconComponent className="h-3.5 w-3.5" />
            <span>
              {change > 0 ? "+" : ""}
              {change}%
            </span>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

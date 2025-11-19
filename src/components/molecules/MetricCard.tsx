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
    <div className={cn("p-2.5 bg-gradient-to-br from-gray-100/60 to-gray-50/40 rounded-[1.75rem]", className)}>
      <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300 border-0 rounded-3xl overflow-hidden">
        <CardContent className="p-4">
          {/* Header row: title and icon */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0", getIconBackground(icon))}>
              <IconComponent className={cn("h-4 w-4", getIconColor(icon))} />
            </div>
          </div>

          {/* Value and subtitle */}
          <div className="space-y-0.5 flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <p className=" text-gray-400">{subtitle}</p>
          </div>

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

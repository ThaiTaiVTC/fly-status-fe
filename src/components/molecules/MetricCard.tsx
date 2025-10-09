import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Plane,
  Users,
  DollarSign,
  Clock,
  Wifi,
  Activity
} from 'lucide-react';

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
  type: 'increase' | 'decrease' | 'warning';
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  subtitle, 
  icon, 
  type, 
  className 
}: MetricCardProps) {
  const IconComponent = iconMap[icon];
  
  const getChangeColor = (type: string) => {
    switch (type) {
      case 'increase':
        return 'metric-change-positive';
      case 'decrease':
        return 'metric-change-negative';
      case 'warning':
        return 'metric-change-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'increase':
        return TrendingUp;
      case 'decrease':
        return TrendingDown;
      case 'warning':
        return AlertTriangle;
      default:
        return TrendingUp;
    }
  };

  const ChangeIconComponent = getChangeIcon(type);

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-4 pt-4 sm:pt-4">
        <CardTitle className="text-sm sm:text-sm font-semibold">{title}</CardTitle>
        <div className="p-2 sm:p-2 bg-primary/10 rounded-lg">
          <IconComponent className="h-4 w-4 sm:h-4 sm:w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-4 pb-4 sm:pb-4">
        <div className="space-y-2 sm:space-y-2">
          <div className="metric-value text-3xl sm:text-2xl font-bold">{value}</div>
          <div className="flex items-center justify-between">
            <div className={cn('flex items-center space-x-1', getChangeColor(type))}>
              <ChangeIconComponent className="h-4 w-4" />
              <span className="text-sm sm:text-sm font-semibold">
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}
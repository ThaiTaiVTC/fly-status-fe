import React from 'react';
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="metric-value">{value}</div>
          <div className="flex items-center justify-between">
            <div className={cn('flex items-center space-x-1', getChangeColor(type))}>
              <ChangeIconComponent className="h-3 w-3" />
              <span className="text-sm font-medium">
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}
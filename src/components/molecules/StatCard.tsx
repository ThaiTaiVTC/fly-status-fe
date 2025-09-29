import React from 'react';
import { Card, CardContent } from '@/components/atoms/Card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
  valueClassName?: string;
}

export function StatCard({ label, value, className, valueClassName }: StatCardProps) {
  return (
    <Card className={cn('p-4', className)}>
      <CardContent className="p-0">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className={cn('font-semibold', valueClassName)}>{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
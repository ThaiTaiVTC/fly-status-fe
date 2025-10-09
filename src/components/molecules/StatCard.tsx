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
    <Card className={cn('p-5', className)}>
      <CardContent className="p-0">
        <div className="flex justify-between items-center">
          <span className="text-base text-muted-foreground font-medium">{label}</span>
          <span className={cn('text-2xl font-bold', valueClassName)}>{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
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
    <Card className={cn('p-5 hover:shadow-md transition-all duration-300', className)}>
      <CardContent className="p-0">
        <div className="flex justify-between items-center">
          <span className="text-base text-gray-600 font-semibold">{label}</span>
          <span className={cn('text-3xl font-extrabold', valueClassName)}>{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
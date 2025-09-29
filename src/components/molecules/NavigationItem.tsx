import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  className?: string;
}

export function NavigationItem({ to, icon: Icon, label, className }: NavigationItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={cn(
        'nav-item',
        isActive ? 'nav-item-active' : 'nav-item-inactive',
        className
      )}
    >
      <Icon className="h-5 w-5 mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
}
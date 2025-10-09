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
        'nav-item min-w-[60px] sm:min-w-[80px]',
        isActive ? 'nav-item-active' : 'nav-item-inactive',
        className
      )}
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5 sm:mb-1" />
      <span className="text-[10px] sm:text-xs font-medium truncate max-w-full">{label}</span>
    </NavLink>
  );
}
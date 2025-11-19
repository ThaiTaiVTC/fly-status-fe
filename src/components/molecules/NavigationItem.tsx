import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

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
    <NavLink to={to} className={cn("flex items-center justify-center transition-all duration-300", isActive ? "text-white scale-110" : "text-white/70 hover:text-white hover:scale-105", className)} title={label}>
      <div className={cn("p-2.5 rounded-full transition-all duration-300", isActive && "bg-white/20")}>
        <Icon className="h-8 w-8" strokeWidth={2.5} />
      </div>
    </NavLink>
  );
}

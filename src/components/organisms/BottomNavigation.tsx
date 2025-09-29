import React from 'react';
import { NavigationItem } from '@/components/molecules/NavigationItem';
import { LayoutDashboard, BarChart3, User } from 'lucide-react';

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        <NavigationItem
          to="/"
          icon={LayoutDashboard}
          label="Tổng quan"
        />
        <NavigationItem
          to="/statistics"
          icon={BarChart3}
          label="Thống kê"
        />
        <NavigationItem
          to="/account"
          icon={User}
          label="Tài khoản"
        />
      </div>
    </nav>
  );
}
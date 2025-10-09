import React from "react";
import { NavigationItem } from "@/components/molecules/NavigationItem";
import { LayoutDashboard, BarChart3, User, Radio, Bell, TrendingUp } from "lucide-react";

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50 safe-area-bottom">
      <div className="flex justify-around items-center py-2 px-2 sm:px-4 max-w-screen-sm mx-auto">
        <NavigationItem to="/" icon={LayoutDashboard} label="Tổng quan" />
        <NavigationItem to="/statistics" icon={BarChart3} label="Thống kê" />
        <NavigationItem to="/realtime" icon={Radio} label="Real-time" />
        <NavigationItem to="/comparison" icon={TrendingUp} label="So sánh" />
        <NavigationItem to="/alerts" icon={Bell} label="Cảnh báo" />
        <NavigationItem to="/account" icon={User} label="Tài khoản" />
      </div>
    </nav>
  );
}

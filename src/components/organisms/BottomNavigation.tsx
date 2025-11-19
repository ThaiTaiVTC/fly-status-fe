import { useState } from "react";
import { NavigationItem } from "@/components/molecules/NavigationItem";
import { BarChart3, LayoutDashboard, User, Plane, ChevronDown, ChevronUp } from "lucide-react";

export function BottomNavigation() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom px-4">
      <div className="max-w-md mx-auto">
        {/* Entire container with slide animation */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            isVisible ? "translate-y-0 pb-6" : "translate-y-[calc(100%-3rem)] pb-2"
          }`}
        >
          {/* Toggle Button - at top of container */}
          <div className="flex justify-center pb-3">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label={isVisible ? "Ẩn thanh điều hướng" : "Hiện thanh điều hướng"}
            >
              {isVisible ? (
                <ChevronDown className="h-6 w-6" strokeWidth={3} />
              ) : (
                <ChevronUp className="h-6 w-6" strokeWidth={3} />
              )}
            </button>
          </div>

          {/* Navigation Bar */}
          <div className={`transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {/* Outer glow/padding layer */}
            <div className="p-3 bg-gradient-to-br from-blue-200/40 to-blue-100/30 rounded-[2.5rem] shadow-lg">
              {/* Inner navigation bar */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-[2rem] shadow-xl">
                <div className="flex justify-around items-center py-3.5 px-4">
                  <NavigationItem to="/" icon={LayoutDashboard} label="Tổng quan" />
                  <NavigationItem to="/statistics" icon={BarChart3} label="Thống kê" />
                  <NavigationItem to="/realtime" icon={Plane} label="Chuyến bay" />
                  <NavigationItem to="/account" icon={User} label="Tài khoản" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

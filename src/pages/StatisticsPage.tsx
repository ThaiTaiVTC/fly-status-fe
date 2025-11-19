import React, { useState } from "react";
import { Header } from "@/components/organisms/Header";
import { BottomNavigation } from "@/components/organisms/BottomNavigation";
import { ChartCard } from "@/components/molecules/ChartCard";
import { Button } from "@/components/atoms/Button";
import { FilterBar } from "@/components/molecules/FilterBar";
import { toast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, Legend } from "recharts";

const hourlyData = [
  { time: "00:00", connections: 85 },
  { time: "04:00", connections: 45 },
  { time: "08:00", connections: 78 },
  { time: "12:00", connections: 92 },
  { time: "16:00", connections: 95 },
  { time: "20:00", connections: 80 },
];

const revenueData = [
  { month: "T1", revenue: 2100000 },
  { month: "T2", revenue: 1900000 },
  { month: "T3", revenue: 2300000 },
  { month: "T4", revenue: 2800000 },
  { month: "T5", revenue: 2650000 },
  { month: "T6", revenue: 3200000 },
];

const packageQuantityData = [
  { package: "Cơ bản", value: 2500 },
  { package: "Cao cấp", value: 8900 },
  { package: "Premium", value: 1200 },
];

const packageRevenueData = [
  { package: "Cơ bản", value: 125000000 },
  { package: "Cao cấp", value: 2230000000 },
  { package: "Premium", value: 480000000 },
];

// Màu sắc cho các gói dịch vụ
const PACKAGE_COLORS = ["#3b82f6", "#8b5cf6", "#ec4899"];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, formatter }: { active?: boolean; payload?: any[]; label?: string; formatter?: (value: number) => string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 backdrop-blur-sm">
        <p className="font-semibold text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {formatter ? formatter(entry.value) : `${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState<"quantity" | "revenue">("quantity");

  const handleExport = () => {
    toast({
      title: "Đang xuất dữ liệu",
      description: "File Excel sẽ được tải xuống sau giây lát...",
    });
  };

  const packageData = activeTab === "quantity" ? packageQuantityData : packageRevenueData;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Filter Bar */}
        <FilterBar onExport={handleExport} />

        {/* Connections by Hour Chart */}
        <ChartCard title="Kết nối theo giờ" description="Số lượng kết nối trong ngày">
          <div className="h-[280px] sm:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hourlyData}
                margin={{
                  top: 20,
                  right: 5,
                  left: -15,
                  bottom: 5,
                }}
                className="sm:!mr-5"
              >
                <defs>
                  <linearGradient id="colorConnections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} interval="preserveStartEnd" />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} domain={[0, 100]} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} width={35} />
                <Tooltip cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }} content={(props) => <CustomTooltip {...props} formatter={(value: number) => `${value} kết nối`} />} />
                <Bar dataKey="connections" fill="url(#colorConnections)" radius={[6, 6, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Revenue 6 Months Chart */}
        <ChartCard title="Doanh thu 6 tháng" description="Xu hướng doanh thu qua các tháng">
          <div className="h-[280px] sm:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{
                  top: 20,
                  right: 5,
                  left: -5,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  domain={[0, 3600000]}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  tickLine={false}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  width={45}
                />
                <Tooltip cursor={{ stroke: "#10b981", strokeWidth: 2, strokeDasharray: "5 5" }} content={(props) => <CustomTooltip {...props} formatter={(value: number) => `${(value / 1000000).toFixed(1)}M VNĐ`} />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{
                    fill: "#10b981",
                    strokeWidth: 2,
                    r: 4,
                    stroke: "#fff",
                  }}
                  activeDot={{
                    r: 7,
                    fill: "#10b981",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                  fill="url(#colorRevenue)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Service Packages Chart */}
        <ChartCard title="Gói dịch vụ" description="So sánh các gói dịch vụ">
          <div className="space-y-4 sm:space-y-6">
            {/* Tabs */}
            <div className="flex space-x-2 bg-muted/50 p-1 rounded-lg w-fit">
              <Button variant={activeTab === "quantity" ? "primary" : "ghost"} size="sm" onClick={() => setActiveTab("quantity")} className="transition-all text-xs sm:text-sm">
                Số lượng
              </Button>
              <Button variant={activeTab === "revenue" ? "primary" : "ghost"} size="sm" onClick={() => setActiveTab("revenue")} className="transition-all text-xs sm:text-sm">
                Doanh thu
              </Button>
            </div>

            {/* Chart */}
            <div className="h-[280px] sm:h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={packageData}
                  margin={{
                    top: 20,
                    right: 5,
                    left: -5,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="colorBasic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={PACKAGE_COLORS[0]} stopOpacity={0.9} />
                      <stop offset="95%" stopColor={PACKAGE_COLORS[0]} stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={PACKAGE_COLORS[1]} stopOpacity={0.9} />
                      <stop offset="95%" stopColor={PACKAGE_COLORS[1]} stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="colorPro" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={PACKAGE_COLORS[2]} stopOpacity={0.9} />
                      <stop offset="95%" stopColor={PACKAGE_COLORS[2]} stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="package" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} interval={0} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    width={45}
                    tickFormatter={(value) => {
                      if (activeTab === "revenue") {
                        return `${(value / 1000000).toFixed(0)}M`;
                      }
                      return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value;
                    }}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                    content={(props) => (
                      <CustomTooltip
                        {...props}
                        formatter={(value: number) => {
                          if (activeTab === "revenue") {
                            return `${(value / 1000000).toFixed(0)}M VNĐ`;
                          }
                          return `${value.toLocaleString()} gói`;
                        }}
                      />
                    )}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                    {packageData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#${index === 0 ? "colorBasic" : index === 1 ? "colorPremium" : "colorPro"})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ChartCard>
      </main>

      <BottomNavigation />
    </div>
  );
}

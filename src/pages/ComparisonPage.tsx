import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BottomNavigation } from "@/components/organisms/BottomNavigation";

const routeComparison = [
  { route: "HAN → SGN", jan: 2800, feb: 3200, mar: 3100, apr: 3400, may: 3300, jun: 3500 },
  { route: "SGN → DAD", jan: 1800, feb: 2100, mar: 2300, apr: 2200, may: 2400, jun: 2600 },
  { route: "HAN → PQC", jan: 1500, feb: 1700, mar: 1900, apr: 2100, may: 2300, jun: 2500 },
];

const monthlyTrend = [
  { month: "T1", revenue: 2800, bandwidth: 11.2, passengers: 10200 },
  { month: "T2", revenue: 3100, bandwidth: 11.8, passengers: 11000 },
  { month: "T3", revenue: 3000, bandwidth: 12.1, passengers: 10800 },
  { month: "T4", revenue: 3300, bandwidth: 12.5, passengers: 11500 },
  { month: "T5", revenue: 3200, bandwidth: 12.8, passengers: 11200 },
  { month: "T6", revenue: 3500, bandwidth: 13.2, passengers: 12000 },
];

const aircraftComparison = [
  { aircraft: "Boeing 787-9", avgSpeed: 13.5, uptime: 99.2, satisfaction: 95 },
  { aircraft: "Airbus A350", avgSpeed: 14.2, uptime: 99.5, satisfaction: 97 },
  { aircraft: "Airbus A321", avgSpeed: 10.8, uptime: 98.7, satisfaction: 92 },
  { aircraft: "Boeing 787-10", avgSpeed: 12.9, uptime: 99.1, satisfaction: 94 },
];

export default function ComparisonPage() {
  const [selectedMetric, setSelectedMetric] = useState<"revenue" | "bandwidth" | "passengers">("revenue");

  const metricLabels = {
    revenue: "Doanh thu (triệu VNĐ)",
    bandwidth: "Băng thông (Mbps)",
    passengers: "Hành khách",
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">So sánh & Phân tích</h1>
          <p className="text-muted-foreground">Phân tích xu hướng và so sánh hiệu suất</p>
        </div>

        {/* Trend Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Tăng trưởng doanh thu</p>
                <ArrowUpRight className="h-5 w-5 text-success" />
              </div>
              <p className="text-3xl font-bold">+12.1%</p>
              <p className="text-sm text-muted-foreground mt-1">So với tháng trước</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Băng thông trung bình</p>
                <ArrowUpRight className="h-5 w-5 text-success" />
              </div>
              <p className="text-3xl font-bold">13.2 Mbps</p>
              <p className="text-sm text-muted-foreground mt-1">+3.1% so với T5</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Hành khách kết nối</p>
                <ArrowUpRight className="h-5 w-5 text-success" />
              </div>
              <p className="text-3xl font-bold">12,000</p>
              <p className="text-sm text-muted-foreground mt-1">+7.1% so với T5</p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Xu hướng theo tháng
              </CardTitle>
              <div className="flex gap-2">
                <Button variant={selectedMetric === "revenue" ? "primary" : "outline"} size="sm" onClick={() => setSelectedMetric("revenue")}>
                  Doanh thu
                </Button>
                <Button variant={selectedMetric === "bandwidth" ? "primary" : "outline"} size="sm" onClick={() => setSelectedMetric("bandwidth")}>
                  Băng thông
                </Button>
                <Button variant={selectedMetric === "passengers" ? "primary" : "outline"} size="sm" onClick={() => setSelectedMetric("passengers")}>
                  Hành khách
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey={selectedMetric} stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", r: 5 }} name={metricLabels[selectedMetric]} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Route Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>So sánh doanh thu theo tuyến (6 tháng)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={routeComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="route" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="jan" fill="hsl(var(--primary))" name="T1" />
                <Bar dataKey="feb" fill="hsl(220 90% 56%)" name="T2" />
                <Bar dataKey="mar" fill="hsl(220 90% 60%)" name="T3" />
                <Bar dataKey="apr" fill="hsl(220 90% 64%)" name="T4" />
                <Bar dataKey="may" fill="hsl(220 90% 68%)" name="T5" />
                <Bar dataKey="jun" fill="hsl(var(--success))" name="T6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Aircraft Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất theo loại máy bay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Máy bay</th>
                    <th className="text-left py-3 px-4 font-semibold">Tốc độ TB (Mbps)</th>
                    <th className="text-left py-3 px-4 font-semibold">Uptime (%)</th>
                    <th className="text-left py-3 px-4 font-semibold">Độ hài lòng (%)</th>
                    <th className="text-left py-3 px-4 font-semibold">Xếp hạng</th>
                  </tr>
                </thead>
                <tbody>
                  {aircraftComparison
                    .sort((a, b) => b.satisfaction - a.satisfaction)
                    .map((aircraft, index) => (
                      <tr key={aircraft.aircraft} className="border-b border-border hover:bg-accent/50 transition-colors">
                        <td className="py-3 px-4 font-semibold">{aircraft.aircraft}</td>
                        <td className="py-3 px-4">{aircraft.avgSpeed}</td>
                        <td className="py-3 px-4">{aircraft.uptime}%</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden max-w-[100px]">
                              <div className="h-full bg-success" style={{ width: `${aircraft.satisfaction}%` }} />
                            </div>
                            <span>{aircraft.satisfaction}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-primary">#{index + 1}</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <BottomNavigation />
      </div>
    </div>
  );
}

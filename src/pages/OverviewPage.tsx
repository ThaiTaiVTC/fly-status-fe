import React, { useState } from "react";
import { Header } from "@/components/organisms/Header";
import { MetricsGrid } from "@/components/organisms/MetricsGrid";
import { BottomNavigation } from "@/components/organisms/BottomNavigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { StatCard } from "@/components/molecules/StatCard";
import { Calendar, ChevronDown } from "lucide-react";

const TimeRangeSelector = ({ selected, onChange }: { selected: string; onChange: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const timeRanges = [
    { label: "Hôm nay", value: "today" },
    { label: "Hôm qua", value: "yesterday" },
    { label: "7 ngày qua", value: "7days" },
    { label: "30 ngày qua", value: "30days" },
    { label: "Tháng này", value: "this_month" },
    { label: "Tháng trước", value: "last_month" },
    { label: "Tùy chọn", value: "custom" },
  ];

  const selectedLabel = timeRanges.find((r) => r.value === selected)?.label || "Hôm nay";

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{selectedLabel}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => {
                  onChange(range.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  selected === range.value ? "bg-sky-50 text-sky-700 font-medium" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function OverviewPage() {
  const [timeRange, setTimeRange] = useState("today");
  const [lastUpdate, setLastUpdate] = useState("30 giây trước");
  return (
    <div className="min-h-screen bg-background pb-20 pt-24">
      <Header />

      <main className="container mx-auto px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">Tổng quan</h2>
            <span className="text-sm text-gray-500">Cập nhật {lastUpdate}</span>
          </div>
          <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
        </div>
        {/* Metrics Grid */}
        <MetricsGrid />

        {/* Aircraft Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Máy bay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <StatCard label="Hoạt động" value="47/50" valueClassName="text-success" />
              <StatCard label="Số chuyến" value="342" valueClassName="text-primary" />
              <StatCard label="Lỗi" value="1" valueClassName="text-danger" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chất lượng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <StatCard label="Tốc độ TB" value="12.8 Mbps" valueClassName="text-primary" />
              <StatCard label="Khiếu nại" value="0.3%" valueClassName="text-warning" />
            </CardContent>
          </Card>
        </div>

        {/* Top Routes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Top tuyến</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { route: "SGN - HAN", passengers: "2,340", flights: "12" },
                { route: "SGN - DAD", passengers: "1,890", flights: "8" },
                { route: "HAN - DAD", passengers: "1,560", flights: "6" },
                { route: "SGN - CXR", passengers: "1,234", flights: "5" },
                { route: "HAN - BMV", passengers: "987", flights: "4" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                  <div>
                    <span className="font-medium">{item.route}</span>
                    <p className="text-sm text-muted-foreground">{item.flights} chuyến</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-primary">{item.passengers}</span>
                    <p className="text-xs text-muted-foreground">hành khách</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
}
